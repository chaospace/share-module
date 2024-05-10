import webpack from "webpack";
import "webpack-dev-server"; //devServer type참조를 위한 import
import merge from "webpack-merge";

import commonConfig from "./webpack.common";
import { outDir, publicDir } from "./webpack.path";

const devConfig: webpack.Configuration = {
    watch: true,
    devServer: {
        static: outDir,
        historyApiFallback: true,
        hot: true,
        port: 5001
    },
    devtool: "cheap-module-source-map",
    plugins: [

    ]
};


export default merge(commonConfig, devConfig);