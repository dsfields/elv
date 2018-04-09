# Change Log

## 2.0

### 2.1.0

__New Features__
* Added JSDoc to everything.
* Added the `elv.behavior` object that allows turning existential checks on and off.
* Added the `elv.populated()` method, which checks if an array, string, or object is not empty.
* Added the `elv.tryGet()` method, which attempts to get an entry from an array at a given index.

### 2.0.0

__Breaking Changes__
* The `elv.coalesce()` function no longer evaluates all arguments that are functions.  Instead, it will only ever evaluate a function if it is the last argument.

## 1.0

### 1.0.0

* Initial release