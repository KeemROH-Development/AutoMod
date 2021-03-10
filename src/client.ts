import { Client, Structures, Collection } from 'discord.js';
import Enmap from 'enmap';
import { logger } from './logger';
import * as moduleImports from './modules';

Structures.extend('GuildMember', GuildMember => class GuildMemberWithPending extends GuildMember {
    pending = false;

    constructor(client: any, data: any, guild: any) {
        super(client, data, guild);
        this.pending = data.pending ?? false;
    }

    _patch(data: any) {
        // @ts-expect-error
        super._patch(data);
        this.pending = data.pending ?? false;
    }
});

const client = new Client();

client.modules = new Collection(Object.values(moduleImports).map(module => [module.name, module]));
client.commands = new Collection();
client.logger = logger;

const defaultCustomer = {
    membership: 'free'
};

client.customers = new Enmap({
	name: 'customers',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep',
	// @ts-expect-error
	autoEnsure: defaultCustomer
});

const defaultSettings = {
    prefix: '!',
    modLogChannel: 'audit-log',
    modRole: 'Mod',
    adminRole: 'Admin',
    welcomeChannel: 'welcome',
    welcomeMessage: 'Say hello to {user}, everyone!'
};

client.settings = new Enmap({
	name: 'settings',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep',
	// @ts-expect-error
	autoEnsure: defaultSettings
});

client.points = new Enmap({
    name: 'points',
    fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
})

export {
    client,
    defaultSettings
};