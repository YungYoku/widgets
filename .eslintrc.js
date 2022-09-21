// eslint-disable-next-line no-undef
module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "@vue/typescript"
  ],

  env: {
    node: true,
    commonjs: true
  },

  rules: {
    strict: 1,
    "vue/no-v-html": ["off"],
    "vue/no-template-shadow": ["off"],
    "vue/html-indent": ["error", 2],
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          normal: "never",
          void: "always"
        }
      }
    ],
    semi: ["error", "always"],
    "prefer-const": "error",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "object-curly-spacing": ["warn", "always"],
    "keyword-spacing": "warn"
  },

  overrides: [
    {
      files: ["*.vue"],
      rules: {
        indent: "off"
      }
    }
  ]
};
