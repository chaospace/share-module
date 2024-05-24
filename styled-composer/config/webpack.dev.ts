import merge from 'webpack-merge';
import commonConfig from './webpack.common';
import webpack from 'webpack';
import 'webpack-dev-server';
import { publicDir } from './webpack.path';

const config: webpack.Configuration = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  watch: true,
  devServer: {
    static: { directory: publicDir },
    historyApiFallback: true,
    hot: true,
    port: 9091
  }
};

export default merge(commonConfig, config);
