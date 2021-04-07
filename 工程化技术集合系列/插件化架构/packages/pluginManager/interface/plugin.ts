export interface PluginManagerOptions {
    [key: string]: any;
}

export interface RegisterPluginItem {
    name: string;
    options?: any,
    useClass?: any;
    useValue?: any;
    useFactory?: any;
}

export interface PluginItem {
    name: string;
    plugin: any;
}

export interface PluginObjItem {
    [key: string]: any;
}

export interface PluginReturnItem {
    plugin: PluginItem[];
    pluginMap: PluginObjItem;
}

export interface PluginReturnStaticItem {
    pluginList: RegisterPluginItem[];
    pluginObject: PluginObjItem;
}