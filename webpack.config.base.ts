import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration } from 'webpack'

const baseConfiguration: Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /.(?:ts?)$/u,
        exclude: /node_modules/u,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
}

export default baseConfiguration
