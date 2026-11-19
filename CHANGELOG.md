# Changelog

## 2.0.0

### Breaking / packaging
- The package now ships compiled ESM (`dist/`) with type declarations instead of raw TypeScript sources.
  Consumers no longer need a `postinstall` build step or a `paths` remap to use it.
- ESM only (`"type": "module"`). Requires Node 18+ and a bundler or runtime that understands `exports`.
- `reflect-metadata` is no longer a dependency. It was imported but never used.
- `typescript`, `core-js`, `es6-shim` and `@types/*` packages are no longer installed with the package.

### Compatibility
- `neat-di/src/all` is still exported as an alias of `neat-di`, so existing imports keep working.
  Prefer `import { Injectable } from 'neat-di'` in new code.
- Runtime behaviour of `Injectable`, `Inject`, `InjectOut` and `DefaultObjectFactory` is unchanged.

### Internal
- Source is compiled with `strict` TypeScript. Public types are tightened slightly
  (`ObjectFactory.init()`/`addToTargetMap()` return `void`, `removeScopedObjects` accepts a nullable `scopeId`).
- Tests moved from karma/webpack 3 to vitest.
- Added CI, `publint` and `@arethetypeswrong/cli` checks.
