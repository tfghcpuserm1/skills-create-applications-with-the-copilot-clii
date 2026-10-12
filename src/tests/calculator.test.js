const test = require('node:test');
const assert = require('node:assert/strict');

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
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

test('performs the extended-operation examples', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(power(2, 3), 8);
  assert.equal(squareRoot(16), 4);
});

test('returns the remainder after modulo', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(-10, 3), -1);
});

test('rejects modulo by zero', () => {
  assert.throws(() => modulo(10, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
});

test('raises a number to an exponent', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(9, 0.5), 3);
});

test('calculates square roots', () => {
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(0), 0);
});

test('rejects square roots of negative numbers', () => {
  assert.throws(() => squareRoot(-1), {
    name: 'RangeError',
    message: 'Cannot calculate square root of a negative number.',
  });
});

test('rejects non-finite operands', () => {
  for (const operation of [add, subtract, multiply, divide, modulo, power]) {
    assert.throws(() => operation(Infinity, 1), {
      name: 'TypeError',
      message: 'Both operands must be valid finite numbers.',
    });
    assert.throws(() => operation(1, Number.NaN), {
      name: 'TypeError',
      message: 'Both operands must be valid finite numbers.',
    });
  }
  assert.throws(() => squareRoot(Infinity), {
    name: 'TypeError',
    message: 'Both operands must be valid finite numbers.',
  });
});

test('calculates every supported operation', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
  assert.equal(calculate(10, '%', 3), 1);
  assert.equal(calculate(2, '^', 3), 8);
  assert.equal(calculate(9, 'sqrt'), 3);
});

test('rejects unsupported operations', () => {
  assert.throws(() => calculate(2, 'invalid', 3), {
    name: 'TypeError',
    message: 'Operation must be one of: +, -, *, /, %, ^, sqrt.',
  });
});
