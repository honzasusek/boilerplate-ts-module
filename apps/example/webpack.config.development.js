import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'
import base from './webpack.config.base.js'
import { merge } from 'webpack-merge'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default merge(base, {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist.development'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/web/development.html',
    }),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    https: false,
  },
})
