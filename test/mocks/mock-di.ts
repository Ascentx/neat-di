import {MockInjectable} from './mock-injectable';
import { Inject } from '../../src/all';

export class MockDi {
    @Inject('mock-injectable')
    public globalMi1: MockInjectable;

    @Inject('mock-injectable')
    public globalMi2: MockInjectable;

    @Inject('mock-injectable', '1')
    public scopedMi1: MockInjectable;

    @Inject('mock-injectable', '2')
    public scopedMi2: MockInjectable;

    public scope;

    public dynamicScopedInject(@Inject('mock-injectable', this.scope) mi?: MockInjectable): MockInjectable {
        return mi;
    }
}