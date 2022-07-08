import { Client } from 'discord.js';

declare global {
    var client: Client;

    type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export {};