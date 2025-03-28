import path from 'path';
import { outDir, srcDir, workspaceDir } from './webpack.path';
import webpack from 'webpack';
import 'webpack-dev-server';

import { ModuleFederationPlugin } from '@module-federation/enhanced';

const commonConfig: webpack.Configuration = {
  entry: path.resolve(srcDir, 'index.ts'),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
    alias: {
      '@': srcDir
    }
  },
  output: {
    path: outDir,
    filename: '[name].js',
    chunkFilename: '[name].js',
    clean: true,
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        type: 'asset',
        resourceQuery: /url/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(workspaceDir, 'babel.config.json'),
            exclude: ['/node_modules/']
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'federation_provider',
      filename: 'remoteModuleEntry.js',
      exposes: {
        './Store': './src/store'
      },
      shared: {
        zustand: { singleton: true },
        react: { singleton: true, version: '0', requiredVersion: false },
        'react-dom': { singleton: true, version: '0', requiredVersion: false }
      }
    })
  ]
};

export default commonConfig;
