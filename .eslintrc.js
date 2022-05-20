const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    node: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: "module",
    parser: '@babel/eslint-parser',
	},
	plugins: [
		'prettier'
	],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
		'prettier/prettier': 1,
		'no-empty': 0,
    'no-unused-vars': 1,
    'no-case-declarations': 0,
  }
});