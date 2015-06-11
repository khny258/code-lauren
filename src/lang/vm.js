var _ = require("underscore");

var util = require("../util");
var standardLibrary = require("./standard-library");
var scope = require("./scope");

function runEndOfProgram(ins, p) {
  return p;
};

function runPush(ins, p) {
  p.stack.push(ins[1]);
  return run(p);
};

function runPop(ins, p) {
  p.stack.pop();
  return run(p);
};

function runInvoke(ins, p) {
  var fn = p.stack.pop();

  console.log(fn);
};

function run(p) {
  var ins = p.bc.shift();
  if (ins === undefined) {
    return runEndOfProgram(ins, p);
  } else if (ins[0] === "push") {
    return runPush(ins, p);
  } else if (ins[0] === "pop") {
    return runPop(ins, p);
  } else if (ins[0] === "return") {
    return run(p);
  }
};

function createProgramAndRun(bc, env, stack) {
  return run(createProgram(bc, env, stack));
};

function createProgram(bc, env, stack) {
  return {
    bc: bc,
    env: env || scope(standardLibrary()),
    stack: stack || []
  };
};

createProgramAndRun.createProgramAndRun = createProgramAndRun;
createProgramAndRun.run = run;
createProgramAndRun.createProgram = createProgram;
module.exports = createProgramAndRun;
