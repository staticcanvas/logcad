import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                fetch: 'readonly',
                Promise: 'readonly',
                Array: 'readonly',
                Object: 'readonly',
                String: 'readonly',
                Number: 'readonly',
                Boolean: 'readonly',
                Date: 'readonly',
                Error: 'readonly',
                RegExp: 'readonly',
                Map: 'readonly',
                Set: 'readonly',
                JSON: 'readonly',
                Math: 'readonly',
                ...globals.browser, // allows browser globals
                ...globals.node     // allows node globals
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module'
            }
        },
        rules: {
            'no-unused-vars': ['warn', { 
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            'no-console': 'off',
            'no-undef': 'error',
            'no-redeclare': 'warn',
            'prefer-const': 'warn',
            'no-var': 'error',
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'brace-style': ['error', '1tbs'],
            'semi': ['error', 'always'],
            'quotes': ['warn', 'single', { avoidEscape: true }],
            'comma-dangle': ['warn', 'never'],
            'indent': ['warn', 4, { SwitchCase: 1 }],
            'no-trailing-spaces': 'warn',
            'eol-last': ['warn', 'always']
        }
    },
    {
        files: ['src/**/*.js'],
        rules: {
            // Source-specific rules
        }
    },
    {
        files: ['**/*.test.js', '**/*.spec.js'],
        rules: {
            'no-unused-vars': 'off'
        }
    },
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'coverage/**',
            '*.min.js'
        ]
    }
];

