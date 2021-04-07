import { EventEmitter, registerNormalize, isValidKeyFromArray, isValidArray, mergeDeep } from '@eft-security-library/shared';
import { PluginManagerOptions, RegisterPluginItem, PluginItem, PluginObjItem } from '../interface/plugin';
import * as InsidePluginList from './importPlugins';

// const pluginLists = require['context']('@eft-security-library/', true, /\.ts$/)

const isValidIgnores = (key: string): boolean => isValidKeyFromArray(PluginManager.ignore, key);

export default class PluginManager extends EventEmitter{
    static ignore: Array<string> = [];
    static options: PluginManagerOptions = {};
    static pluginList: RegisterPluginItem[] = [];
    static pluginObject: PluginObjItem = {};
    
    plugin: PluginItem[] = [];
    pluginMap: PluginObjItem = {};

    constructor(options = {}){
        super();
        this.init(options);
    }

    static register (plugin: RegisterPluginItem) {
        if(plugin) {
            PluginManager.pluginList.push(plugin);
            PluginManager.pluginObject[plugin.name] = plugin.useClass || plugin.useFactory || plugin.useValue;
        };
        return this;
    }

    private init (options) {
        this.initPlugin(options);
        this.applyPlugin();
    }

    private initPlugin(options) {
        PluginManager.options = mergeDeep(PluginManager.options, options);
        this.initCorePlugins(InsidePluginList);
    }

    private initCorePlugins = pluginList => {
        if(!pluginList) return;
        for(let key in pluginList){
            if(!isValidIgnores(key)){
                PluginManager.register({...pluginList[key], options: PluginManager.options[key] || {}});
            }
        }
    }

    private applyPlugin () {
        isValidArray(PluginManager.pluginList) && PluginManager.pluginList.forEach(item => {
            if(!isValidIgnores(item.name)){
                const { name, plugin } = registerNormalize(item);
                this.plugin.push({name, plugin});
                this.pluginMap[item.name] = plugin;
            }
        });
        return this;
    }

    public getPlugin (pluginName: string) {
        return pluginName && this.pluginMap[pluginName];
    }
}