module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      "ecmaVersion": 12,
      "sourceType": "module",
      "ecmaFeatures": {
        "modules": true
      }
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      "react-app",
      "eslint:recommended",
      "plugin:react/recommended"
    ]
  };