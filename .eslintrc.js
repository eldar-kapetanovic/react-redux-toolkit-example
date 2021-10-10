module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jest/recommended",
        "plugin:testing-library/react",
    ],
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: [
        "import", // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
    ],
    root: true,
    rules: {
        // Enforces return statements in callbacks of array’s methods
        "array-callback-return": [0],
        // Enforce capitalization of the first letter of a comment
        "capitalized-comments": [0],
        // Enforce that class methods utilize this
        "class-methods-use-this": [0],
        // Use ES5-style trailing commas for better diffs
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "ignore",
            },
        ],
        // Require or disallow named function expressions
        "func-names": ["error", "never"],
        // Enforce a maximum depth that blocks can be nested
        "max-depth": [1],
        "max-classes-per-file": ["error", 2],
        // Disallow continue statements
        "no-continue": "off",
        // Disallow return before else
        "no-else-return": [2],
        // Disallow if statements as the only statement in else blocks
        "no-lonely-if": ["error"],
        // Disallow Reassignment of Function Parameters
        "no-param-reassign": ["error", { props: false }],
        // Disallow the unary operators ++ and --
        "no-plusplus": "off",
        // Disallow specified syntax
        "no-restricted-syntax": "off",
        // Allow dangling underscores
        "no-underscore-dangle": "off",
        // Disallow Early Use
        "no-use-before-define": ["error", { functions: false }],
        // Enforce variables to be declared either together or separately in functions
        "one-var": [0],
        // Suggest using arrow functions as callbacks
        "prefer-arrow-callback": [0],
        // Suggest using the rest parameters instead of arguments
        "prefer-rest-params": [0],
        // Require a space before blocks
        "space-before-blocks": ["error", "always"],
        // Disallow a space before function parenthesis
        "space-before-function-paren": ["error", "never"],
        // Requires a whitespace (space or tab) beginning a comment
        "spaced-comment": ["error", "always"],
        "no-console": ["error"],
        // Limit Cyclomatic Complexity
        complexity: [1, 8],
        // Disallow one-line if statements
        curly: ["error"],
        // Enforce consistent indentation
        indent: ["error", 4, { SwitchCase: 1 }],
        // Enforce the consistent use of either backticks, double, or single quotes
        quotes: ["error", "double", { avoidEscape: true }],
        // Only require radix parameter when necessary
        radix: ["warn", "always"],
        "padded-blocks": "off",
        "operator-linebreak": "off",
        "object-curly-newline": ["error", {
            ObjectExpression: {
                consistent: true,
            },
            ObjectPattern: {
                consistent: true,
            },
            ImportDeclaration: {
                multiline: true,
                minProperties: 3,
            },
            ExportDeclaration: {
                multiline: true,
                minProperties: 3,
            },
        }],
        "implicit-arrow-linebreak": ["error", "beside"],
        "linebreak-style": 0,
        "function-paren-newline": ["error", "consistent"],
        "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        // Forbid the use of extraneous packages
        "import/no-extraneous-dependencies": [0],
        // Ensures an imported module can be resolved to a module on the local filesystem
        "import/no-unresolved": [0],
        // Ensure consistent use of file extension within the import path
        "import/extensions": [0],
        "eol-last": "error",
        "import/order": [
            "warn",
            {
                groups: [
                    "builtin",
                    "external",
                    "index",
                    "sibling",
                    "parent",
                    "internal",
                ],
            },
        ],
        "jsx-quotes": [
            "error",
            "prefer-double",
        ],
        "max-len": ["error", { code: 100 }],
        "no-duplicate-imports": "error",
        "no-unused-vars": "error",
        "react/jsx-curly-spacing": [
            "warn",
            {
                allowMultiline: true,
                children: {
                    when: "always",
                },
                spacing: {
                    objectLiterals: "always",
                },
                when: "always",
            },
        ],
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx",
                ],
            },
        ],
        "react/jsx-indent": [
            "error",
            4,
            {
                checkAttributes: true,
                indentLogicalExpressions:
                    true,
            },
        ],
        "react/jsx-indent-props": [
            "error",
            4,
        ],
        "react/prop-types": "error",
        semi: "error",
        "sort-imports": [
            "warn",
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
            },
        ],
        "function-call-argument-newline": ["error", "consistent"],
        "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
        "multiline-ternary": ["error", "always-multiline"],
        "newline-after-var": ["error", "always"],
        "no-return-assign": "error",
        "no-constructor-return": "error",
        "no-unreachable": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-semi": "error",
        "no-func-assign": "error",
        "no-irregular-whitespace": "error",
        "no-unexpected-multiline": "error",
        "valid-typeof": "error",
        "no-self-assign": "error",
        "no-catch-shadow": "error",
        "no-shadow": "error",
        "no-undef": "error",
        camelcase: "error",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
