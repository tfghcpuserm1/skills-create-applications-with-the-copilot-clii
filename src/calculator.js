#!/usr/bin/env node

/**
 * A command-line calculator supporting addition (+), subtraction (-),
 * multiplication (*), division (/), modulo (%), exponentiation (^), and square root.
 */

function assertFiniteNumber(value) {
  if (!Number.isFinite(value)) {
    throw new TypeError('Both operands must be valid finite numbers.');
  }
}

function add(left, right) {
  assertFiniteNumber(left);
  assertFiniteNumber(right);
  return left + right;
}

function subtract(left, right) {
  assertFiniteNumber(left);
  assertFiniteNumber(right);
  return left - right;
}

function multiply(left, right) {
  assertFiniteNumber(left);
  assertFiniteNumber(right);
  return left * right;
}

function divide(left, right) {
  assertFiniteNumber(left);
  assertFiniteNumber(right);

  if (right === 0) {
    throw new RangeError('Cannot divide by zero.');
  }

  return left / right;
}

function modulo(left, right) {
  assertFiniteNumber(left);
  assertFiniteNumber(right);

  if (right === 0) {
    throw new RangeError('Cannot divide by zero.');
  }

  return left % right;
}

function power(base, exponent) {
  assertFiniteNumber(base);
  assertFiniteNumber(exponent);
  return base ** exponent;
}

function squareRoot(value) {
  assertFiniteNumber(value);

  if (value < 0) {
    throw new RangeError('Cannot calculate square root of a negative number.');
  }

  return Math.sqrt(value);
}

function calculate(left, operation, right) {
  switch (operation) {
    case '+':
      return add(left, right);
    case '-':
      return subtract(left, right);
    case '*':
      return multiply(left, right);
    case '/':
      return divide(left, right);
    case '%':
      return modulo(left, right);
    case '^':
      return power(left, right);
    case 'sqrt':
      return squareRoot(left);
    default:
      throw new TypeError('Operation must be one of: +, -, *, /, %, ^, sqrt.');
  }
}

function runCli(args) {
  if (args.length === 2 && args[0] === 'sqrt') {
    try {
      console.log(squareRoot(Number(args[1])));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
    return;
  }

  if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number> <+|-|*|/|%|^> <number> or node src/calculator.js sqrt <number>');
    process.exitCode = 1;
    return;
  }

  const [leftOperand, operation, rightOperand] = args;

  try {
    console.log(calculate(Number(leftOperand), operation, Number(rightOperand)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runCli(process.argv.slice(2));
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};
