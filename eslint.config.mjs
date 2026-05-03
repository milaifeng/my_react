import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		env: { browser: true, node: true, es2021: true, jest: true },
		extends: [
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'prettier',
			'plugin:prettier/recommended'
		],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			ecmaVersion: latest,
			sourceType: 'module'
		},
		plugins: { '@typescript-eslint': tseslint },
		rules: {
			'prettier/prettier': 'error',
			'no-case-declarations': 'off',
			'no-constant-condition': 'off',
			'@typescript-eslint/ban-ts-comment': 'off'
		}
	},
	tseslint.configs.recommended
]);
