import webpack from "webpack";
import "webpack-dev-server"; //devServer type참조를 위한 import
import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import { outDir } from "./webpack.path";

const config: webpack.Configuration = {
    watch: true,
    devServer: {
        static: { directory: outDir },
        historyApiFallback: true,
        hot: true,
        port: 5001
    },
    devtool: "cheap-module-source-map",
    plugins: [

    ]
};


export default merge(commonConfig, config);