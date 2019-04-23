import { ObjectFactory } from './../core/object-factory';
import "reflect-metadata";
import { DefaultObjectFactory } from "../impl/default-object-factory";
import { Newable } from "../core/object-factory";

export function Injectable(name: string, required?: boolean) {
    return function (constructor: Function) {
        let of: ObjectFactory = DefaultObjectFactory.getInstance();
        of.addToNameClassMap(name, <Newable> constructor, required);
    }
}