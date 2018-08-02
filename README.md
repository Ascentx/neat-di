# neat-di
Scope based di with singleton and prototype objects. 
Why do we need it?
A lot of time we need singleton objects in js/ts world, But when things run on single thread then using and maintaining singleton objects can be tricky. This is a small library to do just that.

Example:
Lets create a sigleton with @Injectable and register it with object name 'mock-injectable'

```typescript
@Injectable('mock-injectable')
export class MockInjectable {
    constructor() {
        
    }
}
```

Now to use this object we ll use @Inject and name with which the object is registerd. In case of prototype or scope based sigleton the new objects in scope are created during the retreaval.
```typescript
export class MockDi {
    @Inject('mock-injectable')
    public globalMi1: MockInjectable; 
    
    @Inject('mock-injectable', '1')
    public scopedMi1: MockInjectable;

    public scope: string = '1';

    public dynamicScopedInject(@Inject('mock-injectable', this.scope) mi?: MockInjectable): MockInjectable {
        return mi;
    }
}
```
Thats about it.
