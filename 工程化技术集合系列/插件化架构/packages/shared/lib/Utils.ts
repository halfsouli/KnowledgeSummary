export const isValidArray = (arr: any): boolean => Array.isArray(arr) && arr.length > 0;

export const isValidObject = (item: any): boolean => item && typeof item === 'object' && !Array.isArray(item);

export const isValidKeyFromArray = (array: Array<string>, key: string): boolean => Array.isArray(array) && array.includes(key);

export const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isValidObject(target) && isValidObject(source)) {
        for (const key in source) {
            if (isValidObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}