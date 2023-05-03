const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        //JS
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          // Loader Babel
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        // SASS + PostCSS
        test:  /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          "postcss-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        // Images
        test: /\.(png|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        // Font
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins : [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  watch:true,
  mode: 'development',
};