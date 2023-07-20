module.exports = {
	env: {
		es2016: true,
		jest: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		// "standard-with-typescript",
	],
	parserOptions: {
		"ecmaVersion": "latest"
	},
	plugins: [
	],
	rules: {
		"arrow-parens": ["error", "always"],
		"func-style": ["error", "declaration"],
		"jsx-quotes": ["error", "prefer-single"],
		"no-duplicate-imports": "error",
		"no-empty": "error",
		"no-empty-function": "error",
		"no-eval": "error",
		"no-extra-semi": "error",
		"no-inline-comments": "error",
		"no-multi-spaces": "error",
		"no-undef": "error",
		"no-unexpected-multiline": "error",
		"no-unused-vars": "off",
		"prefer-const": "error",
		"prefer-template": "error",
		"quotes": ["error", "double"],
		"require-await": "error",
		"semi": "error",
		"semi-spacing": "error",
		"valid-typeof": "error",
		"no-redeclare": "off",
		"@next/next/no-document-import-in-page": "off",
		"react-hooks/rules-of-hooks": "off"
	}
};
