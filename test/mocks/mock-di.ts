import {MockInjectable} from './mock-injectable';
import { Inject, Injectable } from '../../src/all';
import { MockInjectable2 } from './mock-injectable-2';

@Injectable('MockDi')
export class MockDi {
    @Inject('mock-injectable-2')
    public scopedMidependent: MockInjectable2;

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