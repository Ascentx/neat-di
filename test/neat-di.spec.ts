import { MockDi } from "./mocks/mock-di";
import { DefaultObjectFactory } from "src/all";

describe('neat-di', () => {
    it('Should register the injectable', () => {
        let mdi: MockDi = new MockDi();
        expect(mdi.globalMi1).toBeDefined();
    });

    it('Should give same singleton global on every inject', () => {
        let mdi: MockDi = new MockDi();
        expect(mdi.globalMi1).toEqual(mdi.globalMi2);
    });

    it('Should give different instance on every inject if scoped', () => {
        let mdi: MockDi = new MockDi();
        expect(mdi.scopedMi1).not.toBe(mdi.scopedMi2);
    });

    it('Should give same instance on every inject if scoped ans scope is same', () => {
        let mdi: MockDi = new MockDi();
        expect(mdi.scopedMi1).not.toBe(mdi.scopedMi2);
    });

    it('Should dynamically give scoped instance', () => {
        let mdi: MockDi = new MockDi();
        expect(DefaultObjectFactory.getInstance().getObject('mock-injectable', '2')).toBe(mdi.scopedMi2);
    });
})