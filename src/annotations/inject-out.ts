import "reflect-metadata";
import { DefaultObjectFactory } from "../impl/default-object-factory";
import { ObjectFactory } from "src/core/object-factory";

const injectMetadataKey = Symbol("Inject");

export function InjectOut(name: string, scopeId?: string, constructorArgs?: Array<any>): any {
    return (target: Object, key: string) => {
        let of: ObjectFactory = DefaultObjectFactory.getInstance();
        target[key] = of.getObject(name, scopeId, constructorArgs);

    }
}