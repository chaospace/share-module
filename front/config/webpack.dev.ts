import webpack from 'webpack';
import 'webpack-dev-server'; //devServer type참조를 위한 import
import merge from 'webpack-merge';
import { publicDir } from './webpack.path';
import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = {
  watch: true,
  devServer: {
    client: {
      overlay: {
        warnings: false
      }
    },
    static: { directory: publicDir },
    historyApiFallback: true,
    hot: true,
    port: 9090
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.mode': JSON.stringify('development')
    })
  ]
};

export default merge(commonConfig, devConfig);
