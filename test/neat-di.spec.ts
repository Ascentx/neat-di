import { MockInjectable6, MockInjectable4, MockInjectable2 } from './mocks/mock-injectable-2';
import { ObjectFactory } from 'src/core/object-factory';
import { MockDi } from "./mocks/mock-di";
import {MockInjectable} from './mocks/mock-injectable';
import { DefaultObjectFactory } from "src/all";

describe('neat-di', () => {
    let of: ObjectFactory = DefaultObjectFactory.getInstance();

    beforeAll(() => {
        of.init();
    });

    it('Should register the injectable', () => {
        let mdi: MockDi = of.getObject('MockDi');
        expect(mdi.globalMi1).toBeDefined();
        expect(mdi.globalMi1 instanceof MockInjectable).toBeTruthy();
    });

    it('Should give same singleton global on every inject', () => {
        let mdi: MockDi = of.getObject('MockDi');
        expect(mdi.globalMi1).toEqual(mdi.globalMi2);
    });

    it('Should give different instance on every inject if scoped', () => {
        let mdi: MockDi = of.getObject('MockDi');
        expect(mdi.scopedMi1).not.toBe(mdi.scopedMi2);
    });

    it('Should give same instance on every inject if scoped and scope id is same', () => {
        let mdi1: MockDi = of.getObject('MockDi'),
            mdi2: MockDi = of.getObject('MockDi');

        expect(mdi1.scopedMi1).toBe(mdi2.scopedMi1);
    });

    it('Should dynamically give scoped instance', () => {
        let mdi: MockDi = of.getObject('MockDi');
        expect(of.getObject('mock-injectable', '2')).toBe(mdi.scopedMi2);
    });

    it('Should sort topologically and create instances accordingly', () => {
        let mdi: MockInjectable6 = of.getObject('mock-injectable-6');
        expect(mdi).toBeDefined();
        expect(mdi.prop1).toBeDefined();
        expect(mdi.prop2).toBeDefined();
        expect(mdi.prop3).toBeDefined();
        expect(mdi.prop1.prop).toBeDefined();
        expect(mdi.prop2.prop).toBeDefined();
        expect(mdi.prop3.prop2).toBeDefined();
        expect(mdi.prop3.prop).toBeDefined();
        expect(mdi.prop3.prop instanceof MockInjectable4).toBeTruthy();
        expect(mdi.prop3.prop2 instanceof MockInjectable2).toBeTruthy();
    })
});