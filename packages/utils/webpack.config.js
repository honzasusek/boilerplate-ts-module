import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    library: {
      name: 'module',
      type: 'var',
    },
    scriptType: 'text/javascript',
    module: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /.(?:ts?)$/u,
        exclude: /node_modules/u,
        loader: 'babel-loader',
      },
      {
        test: /.css$/u,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
}
