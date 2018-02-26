import { ObjectFactory, ObjectFactoryArgs, Newable} from "../core/object-factory";

export class DefaultObjectFactory implements ObjectFactory {
    private static _instance: ObjectFactory = new DefaultObjectFactory();
    private _globalObjectMap: {[key: string]: any} = {};
    private _contextObjectMap: {[key: string]: any} = {};
    private static _nameClassMap: {[key: string]: Newable | any} = {};

    constructor() {
        if (DefaultObjectFactory._instance) {
            throw "Injector is singleton can't call new on Injector, Use getInstance Instead.";
        }
    }

    public static getInstance() {
        return this._instance;
    }

    public createGlobalObject(args: ObjectFactoryArgs): any {
        if (!this._globalObjectMap.hasOwnProperty(args.name)) {
            if (!args.objectClass) {
                throw 'Class with name ' + args.name + ' is never registered';
            }
            this._globalObjectMap[args.name] = new args.objectClass(args.constructorArgs);
        }

        return this._globalObjectMap[args.name];
    }

    public createScopedObject(args: ObjectFactoryArgs): any {
        if (!this._contextObjectMap.hasOwnProperty(args.scopeId)) {
            this._contextObjectMap[args.scopeId] = {};
        }

        if (!this._contextObjectMap[args.scopeId].hasOwnProperty(args.name)) {
            if (!args.objectClass) {
                throw 'Class with name ' + args.name + ' is never registered';
            }
            this._contextObjectMap[args.scopeId][args.name] =
                    new args.objectClass(args.constructorArgs)
        }

        return this._contextObjectMap[args.scopeId][args.name];
    }

    public addToNameClassMap(name: string, className: Newable): void {
        if (DefaultObjectFactory._nameClassMap.hasOwnProperty(name)) {
            throw 'Object with name ' + name + ' is already registered';
        } else {
            DefaultObjectFactory._nameClassMap[name] = className;
        }
    }

    public getScopedObject(name: string, scopeId: string, constructorArgs?: Array<any>): any {
        return this.createScopedObject({
            name: name,
            scopeId: scopeId,
            constructorArgs: constructorArgs,
            objectClass: DefaultObjectFactory._nameClassMap[name]
        });
    }

    public getGlobalObject(name: string, constructorArgs?: Array<any>): any {
        return this.createGlobalObject({
            name: name,
            constructorArgs: constructorArgs,
            objectClass: DefaultObjectFactory._nameClassMap[name]
        });
    }

    public getObject(name: string, scopeId?: string, constructorArgs?: Array<any>) {
        if (!scopeId) {
            return this.getGlobalObject(name, constructorArgs);
        } else {
            return this.getScopedObject(name, scopeId, constructorArgs);
        }
    }
}