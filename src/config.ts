import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { logger, LogClass } from './log';
import { MethodType, ServerType, TransportType } from './interfaces';
import { Verbs } from './verbs';

export interface MethodDescriptor {
    verb: Verbs;
    route: string;
    methodType: MethodType;
    propertyKey: string;
    middlewares?: any;
    params: any[];
}
export interface EventDescriptor extends MethodDescriptor {
    name: string;
    value?: any;
    exchange?: string;
}
@LogClass(logger)
export class MethodusClassConfig {
    public methodType: MethodType = MethodType.Local;
    public serverType: ServerType;
    public classType: any;
    public serviceName: string;
    public resolver: Promise<string> | string | any;
    constructor(classType: any, methodType: MethodType,
        serverType: ServerType, resolver?: Promise<any> | any) {
        this.classType = classType;
        this.methodType = methodType;
        this.serverType = serverType;
        this.resolver = () => {
            return resolver;
        };
    }
}

@LogClass(logger)
export class MethodusClientConfig {
    public transportType: any;
    public classType: any;
    public serviceName: string;
    public resolver: Promise<string> | string | any;
    constructor(classType: any, transportType: TransportType,
        resolver?: Promise<any> | any) {
        this.classType = classType;
        this.transportType = transportType;

        this.resolver = () => {
            return resolver;
        };
    }
}

export interface PluginEntry {
    name: string;
    options: any;
}

@LogClass(logger)
export class MethodusConfig {

    public classes: Map<string, MethodusClassConfig> = new Map<string, MethodusClassConfig>();
    public servers: ServerConfig[];
    public clients: Map<string, MethodusClientConfig> = new Map<string, MethodusClientConfig>();
    public plugins: PluginEntry[];
    public port: number;

    constructor(servers?: ServerConfig[], map?: Map<string, MethodusClassConfig>) {
        if (servers) {
            this.servers = servers;
        }

        if (map) {
            this.classes = map;
        }
    }

    public useClient(classType: any, transportType: TransportType,
        resolver?: Promise<any> | string | any) {
        if (transportType === TransportType.Http && !resolver) {
            throw (new Error('Http transport requires a resolver, pass in a string or a promise'));
        }

        const configEntry = new MethodusClientConfig(classType, transportType, resolver);
        this.clients.set(classType.name, configEntry);

    }

    public use(classType: any, methodType: MethodType,
        serverType: ServerType, resolver?: Promise<any> | string | any) {
        if (methodType === MethodType.Http && !resolver) {
            throw (new Error('Http transport requires a resolver, pass in a string or a promise'));
        }

        const configEntry = new MethodusClassConfig(classType, methodType, serverType, resolver);
        this.classes.set(classType.name, configEntry);
    }

    public run(serverType: ServerType, configuration: any) {
        this.servers = this.servers || [];
        this.servers.push(new ServerConfig(serverType, configuration));
    }
}

@LogClass(logger)
export class ServerConfig {
    instanceId: string;
    type: ServerType | any;
    options: any;
    onStart?: () => {};
    constructor(type: ServerType, options?: any) {
        this.type = type;
        this.options = options;
        if (options) {
            this.onStart = options.onStart;
        }
    }
}

export class MethodusConfigurations {
    static _configurations: any;
    public static add(configurationInstance) {
        this._configurations = configurationInstance;
    }

    public static get() {
        return this._configurations;
    }
}

export function MethodusConfigFromFile(configPath) {
    const doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    return doc;
}
