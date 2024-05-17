import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import webpack from "webpack";

const config: webpack.Configuration = {
  mode: "production",
  devtool: undefined
};

export default merge(commonConfig, config);
