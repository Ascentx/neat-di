import { DefaultObjectFactory } from "../impl/default-object-factory.js";
import type { ObjectFactory } from "../core/object-factory.js";

export function InjectOut(name: string, scopeId?: string, constructorArgs?: Array<any>): any {
    return (target: Object, key: string) => {
        let of: ObjectFactory = DefaultObjectFactory.getInstance();

        const getter = function () {
            return of.getObject(name, scopeId, constructorArgs);
        };

        const setter = function (_newVal: unknown) {
            throw "Cannot override an injected property."
        };

        if (delete (target as Record<string, unknown>)[key]) {
            // Create new property with getter and setter
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
}