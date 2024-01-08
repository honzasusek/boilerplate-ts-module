import type * as webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.config.base'

const productionConfiguration: webpack.Configuration = merge(base, {
  mode: 'production',
})

export default productionConfiguration
