import webpack from "webpack";
import "webpack-dev-server"; //devServer type참조를 위한 import
import merge from "webpack-merge";
import { outDir, publicDir } from "./webpack.path";
import commonConfig from "./webpack.common";

const devConfig: webpack.Configuration = {
    watch: true,
    devServer: {
        static: { directory: publicDir },
        historyApiFallback: true,
        hot: true,
        port: 9090
    },
    devtool: "cheap-module-source-map"
};


export default merge(commonConfig, devConfig);