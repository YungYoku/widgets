const { defineConfig } = require("@vue/cli-service");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ["src/**/*.{vue,scss}"],
      }),
    ],
  },
});
