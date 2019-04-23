import {MockInjectable} from './mock-injectable';
import { Inject, InjectOut } from '../../src/all';
import { MockInjectable2 } from './mock-injectable-2';

export class MockDiOut {
    @InjectOut('mock-injectable-2')
    public scopedMidependent: MockInjectable2;

    @InjectOut('mock-injectable')
    public globalMi1: MockInjectable;

    @InjectOut('mock-injectable')
    public globalMi2: MockInjectable;

    @InjectOut('mock-injectable', '1')
    public scopedMi1: MockInjectable;

    @InjectOut('mock-injectable', '2')
    public scopedMi2: MockInjectable;

    public scope;

    public dynamicScopedInject(@InjectOut('mock-injectable', this.scope) mi?: MockInjectable): MockInjectable {
        return mi;
    }
}