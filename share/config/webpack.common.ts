import path from "path";
import { outDir, srcDir } from "./webpack.path";
import webpack from "webpack";
import "webpack-dev-server";
import { dependencies } from "../../package.json";
const { ModuleFederationPlugin } = webpack.container;
console.log("dependencies", dependencies);
const commonConfig: webpack.Configuration = {

    entry: path.resolve(srcDir, "index.ts"),
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
        alias: {
            "@": srcDir
        }
    },
    output: {
        path: outDir,
        filename: "[name].js",
        chunkFilename: "[name].js",
        clean: true,
        publicPath: "auto"
    },
    module: {
        rules: [
            {
                type: "asset",
                resourceQuery: /url/
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        exclude: ["/node_modules/"]
                    }
                }
            },
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "shareModule",
            filename: "shareModuleEntry.js",
            exposes: {
                "./ShareModule": "./src/index"
            },
            shared: {
                zustand: { singleton: true },
                react: { singleton: true },
                "react-dom": { singleton: true }
            }
        })
    ],
}

export default commonConfig;