import path from "path";
import { publicDir, srcDir } from "./webpack.path";
import webpack from "webpack";
import "webpack-dev-server";
import HTMLWebpackPlugin from "html-webpack-plugin";
const { ModuleFederationPlugin } = webpack.container;


const commonConfig: webpack.Configuration = {
    entry: path.resolve(srcDir, "index.tsx"),
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
        alias: {
            "@": srcDir
        }
    },
    output: {
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
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                namedExport: true,
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
            template: path.resolve(publicDir, "index.html")
        }),
        new ModuleFederationPlugin({
            name: "Host",
            remotes: {
                shareModule: "shareModule@http://localhost:5001/shareModuleEntry.js"
            },
            shared: {
                react: { singleton: true },
                "react-dom": { singleton: true },
                zustand: { singleton: true }
            }
        })
    ],
}

export default commonConfig;