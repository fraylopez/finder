module.exports = {
  timeout: 240000,
  require: [
    "ts-node/register",
    "reflect-metadata",
  ],
  "full-trace": true,
  bail: false,
  exit: true,
  spec: "test/**/*.test.ts",
};
