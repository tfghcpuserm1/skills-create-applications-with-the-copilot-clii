#!/usr/bin/env node

/**
 * A command-line calculator supporting addition (+), subtraction (-),
 * multiplication (*), and division (/).
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
    default:
      throw new TypeError('Operation must be one of: +, -, *, /.');
  }
}

function runCli(args) {
  if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number> <+|-|*|/> <number>');
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

module.exports = { add, subtract, multiply, divide, calculate, runCli };
