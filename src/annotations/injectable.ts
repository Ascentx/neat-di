import "reflect-metadata";
import { DefaultObjectFactory } from "src/impl/default-object-factory";
import { Newable } from "src/core/object-factory";

export function Injectable(name: string) {
    return function (constructor: Function) {
        DefaultObjectFactory.getInstance().addToNameClassMap(name, <Newable> constructor);
    }
}