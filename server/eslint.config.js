import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
// Note: airbnb-base requires a specific flat config wrapper or the 'eslint-config-airbnb-base' package
// For a clean modern setup, we use the tseslint recommended sets which cover most of Airbnb's logic
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import __filename, { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(__filename));
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // Replaces 'recommended-requiring-type-checking'
  ...compat.extends('airbnb-base'),
  prettier,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      radix: 'off',
      'no-restricted-syntax': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'off',
      'consistent-return': 'off',

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      'import/prefer-default-export': 'off',
      'import/no-cycle': 'off',
    },
  },
);
