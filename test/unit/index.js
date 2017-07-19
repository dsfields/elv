'use strict';

const assert = require('chai').assert;

const elv = require('../../lib');

describe('#elv', () => {
  it('should return false if obj is undefined', () => {
    const result = elv(undefined);
    assert.isFalse(result);
  });

  it('should return false if obj is null', () => {
    const result = elv(null);
    assert.isFalse(result);
  });

  it('should return true if has value', () => {
    const result = elv({});
    assert.isTrue(result);
  });

  describe('#coalesce', () => {
    it('should return first value if is, and next is not', () => {
      const a = 'a';
      const b = undefined;
      const result = elv.coalesce(a, b);
      assert.strictEqual(result, a);
    });

    it('should return first value if is, and next is', () => {
      const a = 'a';
      const b = 'b';
      const result = elv.coalesce(a, b);
      assert.strictEqual(result, a);
    });

    it('should return next value if is, and first is not', () => {
      const a = undefined;
      const b = 'b';
      const result = elv.coalesce(a, b);
      assert.strictEqual(result, b);
    });

    it('should return first if first is Boolean value false', () => {
      const a = false;
      const b = 'b';
      const result = elv.coalesce(a, b);
      assert.isFalse(result);
    });

    it('should return result of function if found is function and last', () => {
      const a = undefined;
      const b = null;
      const c = 'c';
      const cfunc = () => c;
      const result = elv.coalesce(a, b, cfunc);
      assert.strictEqual(result, c);
    });

    it('should not execute functions unless they are the last arg', () => {
      const a = null;
      const b = () => 'b';
      const c = () => 'c';
      const result = elv.coalesce(a, b, c);
      assert.isFunction(result);
      assert.strictEqual(result, b);
    });

    it('should return undefined if all not', () => {
      const result = elv.coalesce(undefined, undefined, null);
      assert.isUndefined(result);
    });
  });
});
