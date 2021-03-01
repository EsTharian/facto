require('webpack');
const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => ({
  mode: env.WEBPACK_SERVE ? 'development' : 'production',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!index.html']
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        path.join(__dirname, 'src/**/*'),
        path.join(__dirname, 'dist/index.html')
      ],{ nodir: true })
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  'targets': {
                    'node': 'current'
                  }
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|webp|ico)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: env.WEBPACK_BUILD
  },
  devServer: {
    contentBase: './dist',
    compress: false,
    port: 9000,
    writeToDisk: true,
    hot: env.WEBPACK_SERVE
  }
})
