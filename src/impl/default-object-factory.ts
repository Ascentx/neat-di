import { ObjectFactory, ObjectFactoryArgs, Newable, TargetMeta} from "../core/object-factory";
import * as tsort from "toposort";

export class DefaultObjectFactory implements ObjectFactory {

    private static _instance: ObjectFactory = new DefaultObjectFactory();
    private _globalObjectMap: {[key: string]: any} = {};
    private _contextObjectMap: {[key: string]: {[key: string]: any}} = {};
    private static _nameClassMap: {[key: string]: {
        clazz: Newable;
        required: boolean;
    }} = {};
    private static _targetClasses: Array<Object> = [];
    private static _targetDeps: Array<Array<TargetMeta>> = [];
    constructor() {
        if (DefaultObjectFactory._instance) {
            throw "Injector is singleton can't call new on Injector, Use getInstance Instead.";
        }
    }

    public init() {
        let graph = this._buildTargetGraph();
        let sortedDeps =  tsort(graph).reverse();
        this._initializeTargetProperties(sortedDeps);
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

    public addToNameClassMap(name: string, className: Newable, isRequired?: boolean): void {
        if (DefaultObjectFactory._nameClassMap.hasOwnProperty(name)) {
            throw 'Object with name ' + name + ' is already registered';
        } else {
            DefaultObjectFactory._nameClassMap[name] = {
                clazz: className,
                required: isRequired
            };
        }
    }

    public getScopedObject(name: string, scopeId: string, constructorArgs?: Array<any>): any {
        return this.createScopedObject({
            name: name,
            scopeId: scopeId,
            constructorArgs: constructorArgs,
            objectClass: DefaultObjectFactory._nameClassMap[name].clazz
        });
    }

    public removeScopedObjects(scopeId: string, name?: string): Array<any> {
        let key: string,
            object: any,
            map: any,
            mapKey: any,
            objects: Array<any> = [];

        if (this._contextObjectMap[scopeId] && name) {
            object = this._contextObjectMap[scopeId][name];
            delete this._contextObjectMap[scopeId][name];

            if (object) {
                objects.push(object)
            }
        } else if (scopeId) {
            map = this._contextObjectMap[scopeId];
        } else if (name) {
            map = this._contextObjectMap;
            mapKey = name;
        }

        if (map) {
            for (key in map) {
                object = null;

                if (mapKey && map[key]) {
                    object = map[key][mapKey]
                    delete map[key][mapKey];
                } else {
                    object = map[key];
                    delete map[key];
                }

                if (object) {
                    objects.push(object);
                }
            }
        }
        return objects;
    }

    public getGlobalObject(name: string, constructorArgs?: Array<any>): any {
        return this.createGlobalObject({
            name: name,
            constructorArgs: constructorArgs,
            objectClass: DefaultObjectFactory._nameClassMap[name].clazz
        });
    }

    public removeGlobalObject(name: string): any {
        let object = this._globalObjectMap[name];

        delete this._globalObjectMap[name];
        return object;
    }

    public removeAllObjects(name: string): Array<any> {
        let objects: Array<any> = [];

        objects.push(...this.removeScopedObjects(null, name));
        objects.push(this.removeGlobalObject(name));

        return objects;
    }

    public getObject(name: string, scopeId?: string, constructorArgs?: Array<any>) {
        if (!scopeId) {
            return this.getGlobalObject(name, constructorArgs);
        } else {
            return this.getScopedObject(name, scopeId, constructorArgs);
        }
    }

    public addToTargetMap(meta: TargetMeta) {
        let index = DefaultObjectFactory._targetClasses.indexOf(meta.target);

        if (index === -1 ) {
            DefaultObjectFactory._targetClasses.push(meta.target);
            DefaultObjectFactory._targetDeps.push([meta]);
        } else {
            DefaultObjectFactory._targetDeps[index].push(meta);
        }
    }

    private _buildTargetGraph(): Array<Array<Number>> {
        let deps = DefaultObjectFactory._targetDeps,
            graph = [],
            own = [],
            dep, i, j, targetName;

        for (i = 0; i < deps.length; i++) {
            for (j = 0; j < deps[i].length; j++) {
                targetName = this._getNameFromTarget(deps[i][j].target.constructor)
                dep = deps[i][j]['name'];
                graph[i + j] = [targetName, dep];
            }
        }

        return graph;
    }

    private _initializeTargetProperties(depOrder: Array<string>) {
        for (let name of depOrder) {
            if (name) {
                let ob = this.getObject(name);
                let deps = this._getDepsOfTarget(name);

                for (let dep of deps) {
                    ob[dep.key] = this.getObject(dep.name, dep.scopeId, dep.constructorArgs);
                }
            }
        }
    }

    private _getNameFromTarget(target: Function) {
        let classes = DefaultObjectFactory._nameClassMap

        for (let key in classes) {
            if (classes[key].clazz === target) {
                return key;
            }
        }
    }

    private _getDepsOfTarget(name): Array<TargetMeta> {
        let target = DefaultObjectFactory._nameClassMap[name],
            classMap = DefaultObjectFactory._targetClasses,
            deps = DefaultObjectFactory._targetDeps,
            i = 0;

        if (target) {
            for (let clazz of classMap) {
                if (clazz.constructor === target.clazz) {
                    return deps[i];
                }
                i++;
            }
        }

        return [];
    }
}

interface TargetMetaInjectableMap {
    meta: TargetMeta;
    injectable: Object;
}