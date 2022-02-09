module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "@babel/eslint-parser",
  requireConfigFile: false,
  extends: ["eslint:recommended", "google", "prettier"],
  rules: {
    quotes: ["error", "double"],
    "object-curly-spacing": ["error", "always"],
  },
};
