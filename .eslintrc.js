const path = require("path");

module.exports = {
  parser: "babel-eslint",
  plugins: ["prettier", "react-hooks"],
  extends: ["airbnb", "plugin:prettier/recommended"],
  env: {
    jest: true,
    browser: true
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", { packageDir: "./" }],
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error"
  }
};
