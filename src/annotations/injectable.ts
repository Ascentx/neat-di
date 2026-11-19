import type { ObjectFactory } from './../core/object-factory.js';
import { DefaultObjectFactory } from "../impl/default-object-factory.js";
import type { Newable } from "../core/object-factory.js";

export function Injectable(name: string, required?: boolean) {
    return function (constructor: Function) {
        let of: ObjectFactory = DefaultObjectFactory.getInstance();
        of.addToNameClassMap(name, <Newable> constructor, required);
    }
}