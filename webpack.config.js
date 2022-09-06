const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  plugins: [
    new StyleLintPlugin({
      files: ["src/**/*.{vue,scss}"]
    })
  ]
};