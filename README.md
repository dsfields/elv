# elv

Elvis operator functionality for JavaScript.

With the absence of an [Elvis (existential) operator](https://en.wikipedia.org/wiki/Elvis_operator) in JavaScript, I often find myself writing the same checks to see if something is `undefined` over and over and over again.  The `||` operator in JavaScript is generally inadequate for this purpose, because it fails to account for Booleans.  So, I decided to create a small module to clean up the redundant code.

## API

### `elv(val)`

Determines whether or not the argument `val` is _defined_.  Returns `false` if `val` is `undefined` or `null`, or will otherwise returns `true`.

__Parameters__

* `val`: _(required)_ the value on which to perform an existential check.

__Example:__
```js
const elv = require('elv');

const foo = { foo: 'bar' };
console.log(elv(foo)); // true

const bar = undefined;
console.log(elv(bar)); // false

const baz = false;
console.log(elv(baz)); // true

const qux = null;
console.log(elv(qux)); // false
```

### `elv.behavior.enableFalse`

Gets or sets whether or not existential checks should check if value is not `false`.  Defaults to `false` (not enabled).

__Example:__

```js
const elv = require('elv');

console.log(elv(false)); // true

elv.behavior.enableFalse = true;

console.log(elv(false)); // false
```

### `elv.behavior.enableNaN`

Gets or sets whether or not existential checks should check if value is not `Number.NaN`.  Defaults to `false` (not enabled).

__Example:__

```js
const elv = require('elv');

console.log(elv(Number.NaN)); // true

elv.behavior.enableNaN = true;

console.log(elv(Number.NaN)); // false
```

### `elv.behavior.enableNull`

Gets or sets whether or not existential checks should check if value is not `null`.  Defaults to `true` (enabled).

__Example:__

```js
const elv = require('elv');

console.log(elv(null)); // false

elv.behavior.enableNull = false;

console.log(elv(null)); // true
```

### `elv.behavior.enableUndefined`

Gets or sets whether or not existential checks should check if value is not `undefined`.  Defaults to `true` (enabled).

__Example:__

```js
const elv = require('elv');

console.log(elv(undefined)); // false

elv.behavior.enableUndefined = false;

console.log(elv(undefined)); // true
```

### `elv.coalesce(...val)`

Accepts a series of parameters, and returns the first argument that is _defined_.

__Parameters__

* `...val`: _(required)_ the values to coalesce.

__Example:__
```js
const elv = require('elv');
const coalesce = elv.coalesce;

const foo = undefined;
const bar = null;
const baz = 'hello world';
const qux = true;

const result = coalesce(foo, bar, baz, qux);
console.log(result); // hello world
```

#### Deferred Function Execution

If the final argument passed to `elv.coalesce()` is reached, and it is a `function`, then it will evaluate that function and return its result.  The idea is to ensure that potentially expensive functions to execute are not run unless absolutely necessary.

__Example__
```js
const elv = require('elv');
const coalesce = elv.coalesce;

const getFoo = function() {
  // do something expensive to compute theValueOfFoo
  return theValueOfFoo;
};

class Bar {
  constructor(foo) {
    // the getFoo function will only be executed if foo is not truthy
    this._foo = coalesce(foo, getFoo);
  }
}
```

### `elv.ncoalesce(...val)`

Accepts a series of parameters, and returns the first argument that is _defined_.  Works just like [elv.coalesce()](#elvcoalesceval), but it does not lazily execute functions.

__Parameters__

* `...val`: _(required)_ the values to coalesce.

__Example:__
```js
const elv = require('elv');
const coalesce = elv.coalesce;

const foo = undefined;
const bar = null;
const baz = 'hello world';
const qux = true;

const result = coalesce(foo, bar, baz, qux);
console.log(result); // hello world
```

### `elv.populated(val)`

In addition to performing an existential check, determines if a given string, array or object is not empty.  An empty object is one that has no properties.

__Parameters__

* `val`: _(required)_ the value on which to perform an existential and populated check.

__Examples:__

```js
const elv = require('elv');

console.log(elv.populated('foo')); //true
console.log(elv.populated(['foo', 'bar'])); //true
console.log(elv.populated({ foo: 'bar' })); //true
console.log(elv.populated(null)); // false
console.log(elv.populated('')); // false
console.log(elv.populated([])); // false
console.log(elv.populated({})); // false
```

### `elv.tryGet(val, index [, default])`

Attempts to get an entry from an array at the given index.  If the given index is out of the array's bounds, then a given default value is returned.

__Parameters__

* `val`: _(required)_ the array from which an entry is being fetched.

* `index`: _(required)_ the index being referenced in the array.

* `default`: _(optional)_ the default value if index is not found.

__Examples__

```js
const elv = require('elv');

const val = ['foo', 'bar', 'baz', 'qux'];

console.log(elv.tryGet(val, 5)); // undefined
console.log(elv.tryGet(val, 5, 42)); // 42
console.log(elv.tryGet(val, 2)); // baz
```
