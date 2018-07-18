import "reflect-metadata";
import { DefaultObjectFactory } from "../impl/default-object-factory";

const injectMetadataKey = Symbol("Inject");

export function Inject(name: string, scopeId?: string, constructorArgs?: Array<any>): any {
    return (target: Object, key: string) => {
        let instance = DefaultObjectFactory.getInstance()
                .getObject(name, scopeId, constructorArgs);

        if (typeof target[key] !== 'function') {
            target[key] = instance;
        }

        return instance;

    }
}