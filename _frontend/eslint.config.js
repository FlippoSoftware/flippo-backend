import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import pluginEffector from 'eslint-plugin-effector';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginStorybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const flatCompat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  resolvePluginsRelativeTo: import.meta.dirname
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommendedTypeChecked,
  pluginJs.configs.recommended,
  pluginReact.configs.flat?.recommended,
  ...fixupPluginRules(flatCompat.extends('plugin:react-hooks/recommended')),
  ...pluginStorybook.configs['flat/recommended'],
  pluginPerfectionist.configs['recommended-natural'],
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, NodeJS: true },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.app.json'],
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'prettier.config.js', 'stylelint.config.js']
        },
        tsconfigRootDir: import.meta.dirname
      }
    },

    plugins: {
      effector: pluginEffector,
      prettier: pluginPrettier,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      storybook: pluginStorybook
    },

    rules: {
      ...pluginEffector.configs.recommended.rules,
      '@typescript-eslint/array-type': ['warn', { default: 'array', readonly: 'array' }],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports'
        }
      ],
      '@typescript-eslint/default-param-last': 'warn',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          selector: 'variable'
        },
        {
          format: ['PascalCase'],
          selector: 'typeLike'
        }
      ],
      '@typescript-eslint/no-array-delete': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: false,
          allowTernary: true
        }
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/typedef': [
        'warn',
        {
          memberVariableDeclaration: true,
          parameter: true,
          propertyDeclaration: true
        }
      ],
      'default-param-last': 'off',
      'effector/no-duplicate-on': 'off',
      'no-redeclare': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'perfectionist/sort-objects': ['warn', { ignorePattern: ['sample', 'split', 'attache', 'condition'] }],
      'prettier/prettier': ['warn', { endOfLine: 'auto' }, { usePrettierrc: true }],
      'react/function-component-definition': [
        1,
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/hook-use-state': 'off',
      'react/jsx-boolean-value': [1, 'never'],
      'react/jsx-closing-bracket-location': 1,
      'react/jsx-curly-brace-presence': [1, 'always'],
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/jsx-fragments': [1, 'syntax'],
      'react/jsx-indent-props': [1, 2],
      'react/jsx-no-duplicate-props': [1, { ignoreCase: true }],
      'react/jsx-no-leaked-render': [1, { validStrategies: ['ternary'] }],
      'react/jsx-wrap-multilines': [
        1,
        {
          arrow: 'parens-new-line',
          assignment: 'parens-new-line',
          condition: 'parens-new-line',
          declaration: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
          return: 'parens-new-line'
        }
      ],
      'react/react-in-jsx-scope': 0
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    ...tseslint.configs.disableTypeChecked
  }
];
