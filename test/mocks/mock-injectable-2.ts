import { MockInjectable } from './mock-injectable';
import {Injectable, Inject} from '../../src/all';

/**
 * Testing deps as
 *   C1 -> C2 -> \/ -> C6
 *      -> C3 -> C5 -^
 *      -> C4 -^
 */
@Injectable('mock-injectable-2')
export class MockInjectable2 {
    @Inject('mock-injectable')
    public prop: MockInjectable;
    constructor() {
    }
}

@Injectable('mock-injectable-3')
export class MockInjectable3 {
    @Inject('mock-injectable')
    public prop: MockInjectable;
    constructor() {
    }
}

@Injectable('mock-injectable-4')
export class MockInjectable4 {
    @Inject('mock-injectable')
    public prop: MockInjectable;
    constructor() {
    }
}

@Injectable('mock-injectable-5')
export class MockInjectable5 {
    @Inject('mock-injectable-4')
    public prop: MockInjectable4;
    @Inject('mock-injectable-2')
    public prop2: MockInjectable2;
    constructor() {
    }
}

@Injectable('mock-injectable-6')
export class MockInjectable6 {
    @Inject('mock-injectable-4')
    public prop1: MockInjectable4;

    @Inject('mock-injectable-2')
    public prop2: MockInjectable2;

    @Inject('mock-injectable-5')
    public prop3: MockInjectable5;
    constructor() {
    }
}