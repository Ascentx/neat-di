export interface ObjectFactory {
    createGlobalObject(args: ObjectFactoryArgs): any;
    createScopedObject(args: ObjectFactoryArgs): any;
    getGlobalObject(name: string, constructorArgs?: Array<any>): any;
    removeGlobalObject(name: string): any;
    getScopedObject(name: string, scopeId: string, constructorArgs?: Array<any>): any;
    removeScopedObjects(scopeId: string, name?: string): Array<any>;
    removeAllObjects(name: string): Array<any>;
    getObject(name: string, scopeId?: string, constructorArgs?: Array<any>): any;
    addToNameClassMap(name: string, className: Newable, isRequired?: boolean): void;
    addToTargetMap(meta: TargetMeta);
    init();
}

export interface ObjectFactoryArgs {
    name: string;
    scopeId?: string;
    constructorArgs?: Array<any>;
    objectClass: Newable;
}

export interface TargetMeta {
    name: string;
    scopeId?: string;
    constructorArgs?: Array<any>;
    target: Object;
    key: string;
}

export interface Newable {
    new(...args: Array<any>): any;
}