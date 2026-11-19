import { DefaultObjectFactory } from "../impl/default-object-factory.js";
import type { ObjectFactory } from "../core/object-factory.js";

export function Inject(name: string, scopeId?: string, constructorArgs?: Array<any>): any {
    return (target: Object, key: string) => {
        let of: ObjectFactory = DefaultObjectFactory.getInstance();

        of.addToTargetMap({
            name: name,
            scopeId: scopeId,
            constructorArgs: constructorArgs,
            target: target,
            key: key
        });
    }
}