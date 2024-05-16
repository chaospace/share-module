import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import webpack from "webpack";
import BundleDeclarationsWebpackPlugin from "bundle-declarations-webpack-plugin";
const prodConfig: webpack.Configuration = {
  mode: "production",
  devtool: undefined,
  // experiments: {
  //   outputModule: true
  // },
  output: {
    // module: true,
    // libraryTarget: "module",
    library: {
      type: "umd",
      umdNamedDefine: true,
      name: "styledComposer",
    },
    globalObject: "this"
  },
  plugins: [
    new BundleDeclarationsWebpackPlugin({
      outFile: "index.d.ts"
    })
  ]
};

export default merge(commonConfig, prodConfig);
