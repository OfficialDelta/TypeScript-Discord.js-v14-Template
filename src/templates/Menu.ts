import {
    CommandInteraction,
    InteractionCollector,
    Message,
    MessageActionRow,
    MessageButton,
    MessageComponentInteraction,
    MessageEmbed,
    TextChannel,
} from 'discord.js'
import EventEmitter from 'events'

type ButtonAction = {
    customId: string
    action: (() => void) | string
}

type MenuPage = {
    name: string
    content: MessageEmbed
    actionRows: MessageActionRow[]
    buttonActions: ButtonAction[]
}

/**
 * Represents a menu
 */
export default class Menu extends EventEmitter {
    channel: TextChannel
    userId: string
    pageArray: MenuPage[]
    timeout: number
    idle: number
    interaction: CommandInteraction | null
    currentPage: MenuPage
    pageIndex: number
    menu?: Message
    collector?: InteractionCollector<MessageComponentInteraction>

    private errorPage: MenuPage = {
        name: 'error',
        content: new MessageEmbed({
            description: 'Error: page index not found',
        }),
        actionRows: [
            new MessageActionRow().addComponents([
                new MessageButton({
                    label: 'Stop Menu Session',
                    customId: 'stop',
                    style: 'DANGER',
                }),
            ]),
        ],
        buttonActions: [
            {
                customId: 'stop',
                action: 'stop',
            },
        ],
    }

    /**
     * @param {TextChannel} channel - The channel the menu will be sent in
     * @param {string} userId - The ID of the user who is allowed to interact with the menu
     * @param {MenuPage[]} pageArray - The pages of the menu
     * @param {Number} timeout - The timeout of the menu
     * @param {Number} idle - The idle time of the menu before it stops listening for button interactions
     * @param {CommandInteraction} interaction - The interaction that triggered the menu
     *
     * @remarks
     * Blacklisted page names are: `first, last, previous, next, stop, delete`.
     * These names perform special functions and should only be used as reaction destinations.
     */
    constructor(
        channel: TextChannel,
        userId: string,
        pageArray: MenuPage[],
        timeout: number = 60 * 1000,
        idle: number = 15 * 1000,
        interaction: CommandInteraction
    ) {
        super()
        this.channel = channel
        this.userId = userId
        this.pageArray = pageArray
        this.timeout = timeout
        this.idle = idle
        this.interaction = interaction ?? null

        if (!this.channel) throw new Error('Channel is required')
        if (!this.userId) throw new Error('User ID is required')
        if (!this.pageArray) throw new Error('Page array is required')
        if (!this.timeout) throw new Error('Timeout is required')
        if (!this.idle) throw new Error('Idle time is required')
        if (!this.pageArray[0]) throw new Error('Page array is empty')

        this.currentPage = this.pageArray[0]
        this.pageIndex = 0
    }

    /**
     * Sends the menu and starts listening for button interactions
     */
    async start(): Promise<void> {
        this.emit('pageChange', this.currentPage)
        let menu: Message

        if (!this.interaction) {
            menu = await this.channel.send({
                embeds: [this.currentPage.content],
                components: this.currentPage.actionRows,
            })
        } else {
            menu = (await this.interaction.reply({
                embeds: [this.currentPage.content],
                components: this.currentPage.actionRows,
                fetchReply: true,
            })) as Message
        }

        this.menu = menu
        this.startButtons()
    }

    /**
     * Starts listening for button interactions
     */
    startButtons(): void {
        const filter = (i: MessageComponentInteraction) =>
            i.user.id === this.userId

        if (!this.menu) throw new Error('Menu is not started')

        this.collector = this.menu.createMessageComponentCollector({
            filter,
            time: this.timeout,
            idle: this.idle,
        })

        this.collector.on('collect', async (i) => {
            await i.deferUpdate()
            const customId = (i.component as MessageButton).customId
            const action = this.currentPage.buttonActions.find(
                (b) => b.customId === customId
            )?.action

            if (!action) throw Error('Action not found')

            if (typeof action === 'function') {
                return action()
            }

            switch (action) {
                case 'first':
                    return this.setPage(0)
                case 'last':
                    return this.setPage(this.pageArray.length - 1)
                case 'previous':
                    return this.setPage(this.pageIndex - 1)
                case 'next':
                    return this.setPage(this.pageIndex + 1)
                case 'stop':
                    return this.stop()
                case 'delete':
                    return this.delete()
                default:
                    return this.setPage(action)
            }
        })

        this.collector.on('end', async () => {
            await this.stop()
        })
    }

    /**
     * Stops listening for button interactions and removes the buttons from the menu
     */
    async stop(): Promise<void> {
        if (!this.menu) throw new Error('Menu is not started')
        if (!this.collector) throw new Error('Collector is not started')

        this.collector.stop()
        await this.menu.edit({
            embeds: [this.currentPage.content],
            components: [],
        })
    }

    /**
     * Deletes the menu
     */
    async delete(): Promise<void> {
        await this.menu?.delete()
    }

    /**
     * Sets the current page to the page with the given index or name
     * @param {number | string} arg - The index/name of the page
     */
    async setPage(page: number): Promise<void>
    async setPage(name: string): Promise<void>
    async setPage(arg: number | string): Promise<void> {
        if (!this.menu) throw new Error('Menu is not started')

        if (typeof arg === 'number') {
            this.pageIndex = arg
            this.currentPage = this.pageArray[arg] ?? this.errorPage
        } else {
            this.pageIndex = this.pageArray.findIndex((p) => p.name === arg)
            this.currentPage = this.pageArray[this.pageIndex] ?? this.errorPage
        }

        this.emit('pageChange', this.currentPage)

        await this.menu.edit({
            embeds: [this.currentPage.content],
            components: this.currentPage.actionRows,
        })
    }
}
