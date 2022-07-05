const { defineConfig } = require("@vue/cli-service");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ["src/**/*.{vue,scss}"]
      }),
      new Dotenv()
    ]
  }
});
