'use strict';

const { assert } = require('chai');

const elv = require('../../lib');


describe('#elv', () => {

  beforeEach(function() {
    elv.behavior.enableFalse = false;
    elv.behavior.enableNaN = false;
    elv.behavior.enableNull = true;
    elv.behavior.enableUndefined = true;
  });


  it('returns false if obj is undefined', function() {
    const result = elv(undefined);
    assert.isFalse(result);
  });

  it('returns false if obj is null', function() {
    const result = elv(null);
    assert.isFalse(result);
  });

  it('returns true if has value', function() {
    const result = elv({});
    assert.isTrue(result);
  });

  it('returns true if obj is false', function() {
    const result = elv(false);
    assert.isTrue(result);
  });

  it('returns true if obj is NaN', function() {
    const result = elv(Number.NaN);
    assert.isTrue(result);
  });

  it('returns false if obj is false and behavior.enableFalse', function() {
    elv.behavior.enableFalse = true;
    const result = elv(false);
    assert.isFalse(result);
  });

  it('returns false if obj is NaN and behavior.enableNaN', function() {
    elv.behavior.enableNaN = true;
    const result = elv(Number.NaN);
    assert.isFalse(result);
  });

  it('returns true if obj is undefined and !behavior.enableUndefined', function() {
    elv.behavior.enableUndefined = false;
    const result = elv(undefined);
    assert.isTrue(result);
  });

  it('returns true if obj is null and !behavior.enableNull', function() {
    elv.behavior.enableNull = false;
    const result = elv(null);
    assert.isTrue(result);
  });


  describe('#coalesce', () => {
    it('returns first value if is, and next is not', function() {
      const a = 'a';
      const b = undefined;
      const result = elv.coalesce(a, b);
      assert.strictEqual(result, a);
    });

    it('returns first value if is, and next is', function() {
      const a = 'a';
      const b = 'b';
      const result = elv.coalesce(a, b);
      assert.strictEqual(result, a);
    });

    it('returns next value if is, and first is not', function() {
      const a = undefined;
      const b = 'b';
      const result = elv.coalesce(a, b);
      assert.strictEqual(result, b);
    });

    it('returns first if first is Boolean value false', function() {
      const a = false;
      const b = 'b';
      const result = elv.coalesce(a, b);
      assert.isFalse(result);
    });

    it('returns result of function if found is function and last', function() {
      const a = undefined;
      const b = null;
      const c = 'c';
      const cfunc = () => c;
      const result = elv.coalesce(a, b, cfunc);
      assert.strictEqual(result, c);
    });

    it('should not execute functions unless they are the last arg', function() {
      const a = null;
      const b = () => 'b';
      const c = () => 'c';
      const result = elv.coalesce(a, b, c);
      assert.isFunction(result);
      assert.strictEqual(result, b);
    });

    it('returns undefined if all not', function() {
      const result = elv.coalesce(undefined, undefined, null);
      assert.isUndefined(result);
    });
  });


  describe('#ncoalesce', () => {
    it('returns first value if is, and next is not', function() {
      const a = 'a';
      const b = undefined;
      const result = elv.ncoalesce(a, b);
      assert.strictEqual(result, a);
    });

    it('returns first value if is, and next is', function() {
      const a = 'a';
      const b = 'b';
      const result = elv.ncoalesce(a, b);
      assert.strictEqual(result, a);
    });

    it('returns next value if is, and first is not', function() {
      const a = undefined;
      const b = 'b';
      const result = elv.ncoalesce(a, b);
      assert.strictEqual(result, b);
    });

    it('returns first if first is Boolean value false', function() {
      const a = false;
      const b = 'b';
      const result = elv.ncoalesce(a, b);
      assert.isFalse(result);
    });

    it('returns undefined if all not', function() {
      const result = elv.ncoalesce(undefined, undefined, null);
      assert.isUndefined(result);
    });
  });


  describe('#populated', function() {
    it('returns false if val undefined', function() {
      const result = elv.populated(undefined);
      assert.isFalse(result);
    });

    it('returns false if val null', function() {
      const result = elv.populated(null);
      assert.isFalse(result);
    });

    it('returns false if empty string', function() {
      const result = elv.populated('');
      assert.isFalse(result);
    });

    it('returns false if empty array', function() {
      const result = elv.populated([]);
      assert.isFalse(result);
    });

    it('returns false if empty object', function() {
      const result = elv.populated({});
      assert.isFalse(result);
    });

    it('returns true if non-empty string', function() {
      const result = elv.populated('foo');
      assert.isTrue(result);
    });

    it('returns true if nom-empty array', function() {
      const result = elv.populated(['foo']);
      assert.isTrue(result);
    });

    it('returns true if non-empty object', function() {
      const result = elv.populated({ foo: 'bar' });
      assert.isTrue(result);
    });
  });


  describe('#tryGet', function() {
    it('returns undefined if array undefined', function() {
      const result = elv.tryGet(undefined, 2);
      assert.isUndefined(result);
    });

    it('returns default if array undefined', function() {
      const result = elv.tryGet(undefined, 2, 42);
      assert.strictEqual(result, 42);
    });

    it('returns undefined if index exceeds array bounds', function() {
      const result = elv.tryGet(['foo'], 2);
      assert.isUndefined(result);
    });

    it('returns default if index exceeds array bounds', function() {
      const result = elv.tryGet(['foo'], 2, 42);
      assert.strictEqual(result, 42);
    });

    it('returns value at index if does not exceed array counds', function() {
      const result = elv.tryGet(['foo', 'bar', 'baz', 'qux'], 2);
      assert.strictEqual(result, 'baz');
    });
  });

});
