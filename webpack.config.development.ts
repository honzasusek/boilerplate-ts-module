import type * as webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.config.base'

const developmentConfiguration: webpack.Configuration = merge(base, {
  mode: 'development',
  devServer: {
    compress: true,
    historyApiFallback: true,
    https: false,
  },
} as webpack.Configuration)

export default developmentConfiguration
