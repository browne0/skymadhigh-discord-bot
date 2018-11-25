const config = {
  parser: "babel-eslint",
  extends: [
    "airbnb-base",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
	"no-tabs": 0,
	"linebreak-style": 0,
	"no-unescaped-entities": 0,
  },
};

module.exports = config;
