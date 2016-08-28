# elv

Elvis operator functionality for JavaScript.

With the absence of an [Elvis (existential) operator](https://en.wikipedia.org/wiki/Elvis_operator) in JavaScript, I often find myself writing the same checks to see if something is `undefined` over and over and over again.  The `||` operator in JavaScript is generally inadequate for this purpose, because it fails to account for Booleans.  So, I decided to create a small module to clean up the redundant code.

## API

### `elv(obj)`

Determines whether or not the argument `obj` is _truthy_.  Returns `false` if `obj` is `undefined` or `null`, or will otherwise returns `true`.

##### Example:
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

### `elv.coalesce(obj[, obj1, obj2 ...,objN])`

Accepts a series of parameters, and returns the first argument that is _truthy_.

##### Example:
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
The `elv.coalesce()` function will execute `function` arguments, and return its value if it is found to be the first _truthy_ argument in the series.  The idea is to ensure that potentially expensive functions to execute are not run unless absolutely necessary.

##### Example
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
