import { MockDi } from "./mocks/mock-di";
import {MockInjectable} from './mocks/mock-injectable';
import { DefaultObjectFactory } from "src/all";

describe('neat-di', () => {
    it('Should register the injectable', () => {
        let mdi: MockDi = new MockDi();
        expect(mdi.globalMi1).toBeDefined();
        expect(mdi.globalMi1 instanceof MockInjectable).toBeTruthy();
    });

    it('Should give same singleton global on every inject', () => {
        let mdi: MockDi = new MockDi();
        expect(mdi.globalMi1).toEqual(mdi.globalMi2);
    });

    it('Should give different instance on every inject if scoped', () => {
        let mdi: MockDi = new MockDi();
        expect(mdi.scopedMi1).not.toBe(mdi.scopedMi2);
    });

    it('Should give same instance on every inject if scoped and scope id is same', () => {
        let mdi1: MockDi = new MockDi(),
            mdi2: MockDi = new MockDi();

        expect(mdi1.scopedMi1).toBe(mdi2.scopedMi1);
    });

    it('Should dynamically give scoped instance', () => {
        let mdi: MockDi = new MockDi();
        expect(DefaultObjectFactory.getInstance().getObject('mock-injectable', '2')).toBe(mdi.scopedMi2);
    });
})