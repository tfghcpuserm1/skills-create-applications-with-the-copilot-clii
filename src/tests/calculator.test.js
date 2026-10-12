const test = require('node:test');
const assert = require('node:assert/strict');

const {
  add,
  subtract,
  multiply,
  divide,
  calculate,
} = require('../calculator');

test('adds the example operands', () => {
  assert.equal(add(2, 3), 5);
});

test('adds negative and decimal operands', () => {
  assert.equal(add(-2, 3), 1);
  assert.equal(add(1.5, 2.25), 3.75);
});

test('subtracts the example operands', () => {
  assert.equal(subtract(10, 4), 6);
});

test('subtracts negative operands', () => {
  assert.equal(subtract(-2, -3), 1);
});

test('multiplies the example operands', () => {
  assert.equal(multiply(45, 2), 90);
});

test('multiplies by zero and negative numbers', () => {
  assert.equal(multiply(0, 45), 0);
  assert.equal(multiply(-3, 4), -12);
});

test('divides the example operands', () => {
  assert.equal(divide(20, 5), 4);
});

test('divides negative and decimal results', () => {
  assert.equal(divide(-9, 3), -3);
  assert.equal(divide(1, 4), 0.25);
});

test('rejects division by zero', () => {
  assert.throws(() => divide(20, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
});

test('rejects non-finite operands', () => {
  for (const operation of [add, subtract, multiply, divide]) {
    assert.throws(() => operation(Infinity, 1), {
      name: 'TypeError',
      message: 'Both operands must be valid finite numbers.',
    });
    assert.throws(() => operation(1, Number.NaN), {
      name: 'TypeError',
      message: 'Both operands must be valid finite numbers.',
    });
  }
});

test('calculates every supported operation', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
});

test('rejects unsupported operations', () => {
  assert.throws(() => calculate(2, '%', 3), {
    name: 'TypeError',
    message: 'Operation must be one of: +, -, *, /.',
  });
});
