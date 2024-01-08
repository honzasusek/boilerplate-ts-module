import base from './webpack.config.base.js'
import { merge } from 'webpack-merge'

export default merge(base, {
  mode: 'production',
})
