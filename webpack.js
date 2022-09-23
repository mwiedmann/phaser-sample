const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const config = {
  entry: './src/index.ts',
  output: {
    filename: `[name].[hash].min.js`,
    chunkFilename: `[name].[chunkhash].min.js`
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images', noErrorOnMissing: true },
        { from: 'src/sounds', to: 'sounds', noErrorOnMissing: true }
      ]
    }),
    new HtmlWebpackPlugin()
  ]
}

module.exports = config
