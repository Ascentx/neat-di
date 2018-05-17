export interface ObjectFactory {
    createGlobalObject(args: ObjectFactoryArgs): any;
    createScopedObject(args: ObjectFactoryArgs): any;
    getGlobalObject(name: string, constructorArgs?: Array<any>): any;
    getScopedObject(name: string, scopeId: string, constructorArgs?: Array<any>): any;
    getObject(name: string, scopeId?: string, constructorArgs?: Array<any>): any;
    addToNameClassMap(name: string, className: Newable): void;
}

export interface ObjectFactoryArgs {
    name: string,
    scopeId?: string,
    constructorArgs?: Array<any>,
    objectClass: Newable
}

export interface Newable {
    new(...args: Array<any>): any
}