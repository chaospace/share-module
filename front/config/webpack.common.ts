import path from 'path';
import { appDir, publicDir, srcDir, workspaceDir } from './webpack.path';
import webpack from 'webpack';
import 'webpack-dev-server';
import HTMLWebpackPlugin from 'html-webpack-plugin';
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
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                auto: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(publicDir, 'index.html')
    }),
    new ModuleFederationPlugin({
      name: 'Host',
      remotes: {
        federation_provider: 'federation_provider@http://localhost:5001/remoteModuleEntry.js'
      },
      shared: {
        react: { singleton: true, version: '0', requiredVersion: false },
        'react-dom': { singleton: true, version: '0', requiredVersion: false },
        zustand: { singleton: true }
      }
    })
  ]
};

export default commonConfig;
