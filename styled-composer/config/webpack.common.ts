import path from "path";
import { outDir, srcDir } from "./webpack.path";
import webpack from "webpack";
const commonConfig: webpack.Configuration = {
  entry: path.resolve(srcDir, "index.ts"),
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
    alias: {
      "@": srcDir,
    },
  },
  output: {
    clean: true,
    path: outDir,
    filename: "main.js",
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
  plugins: [],
};

export default commonConfig;
