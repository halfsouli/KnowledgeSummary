import { RegisterPluginItem, PluginItem } from '../interface/plugin';

const useClass = plugin => {
    const { useClass, options = {} } = plugin;
    return Reflect.construct(useClass, [options]);
}

const useValue = plugin => {
    return plugin.useValue;
}

const useFactory = plugin => {
    return plugin.useFactory(plugin.options);
}

export const registerNormalize = (registerItem: RegisterPluginItem): PluginItem => {
    let plugin = null;
    if(registerItem.useClass){
        plugin = useClass(registerItem);
    }else if(registerItem.useValue){
        plugin = useValue(registerItem);
    }else if(registerItem.useFactory){
        plugin = useFactory(registerItem);
    }
    return { name: registerItem.name, plugin };
}