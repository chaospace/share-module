import path from "path";
import { outDir, srcDir } from "./webpack.path";
import webpack from "webpack";
import BundleDeclarationsWebpackPlugin from "bundle-declarations-webpack-plugin";
const commonConfig: webpack.Configuration = {
  entry: path.resolve(srcDir, "index.ts"),
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": srcDir,
    },
  },
  output: {
    clean: true,
    path: outDir,
    filename: "main.js",
    library: {
      type: "umd",
      umdNamedDefine: true,
      name: "styledComposer",
    },
    globalObject: "this"
  },
  module: {
    rules: [
      {
        type: "asset",
        resourceQuery: /url/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            exclude: ["/node_modules/"],
          },
        },
      },
    ],
  },
  plugins: [
    new BundleDeclarationsWebpackPlugin({
      outFile: "index.d.ts"
    })

  ],
};

export default commonConfig;
