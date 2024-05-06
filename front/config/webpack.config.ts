import path from "path";
import fs from "fs";
import webpack from "webpack";
import "webpack-dev-server";
import HTMLWebpackPlugin from "html-webpack-plugin";
const appDir = fs.realpathSync(process.cwd());
const srcDir = path.resolve(appDir, "src");
const publicDir = path.resolve(appDir, "public");
const outDir = path.resolve(appDir, "dist");



const configurationFunc = (env: any, args: any): webpack.Configuration => {
    const isDev = args.mode === "development";
    console.log('publicDir', publicDir, 'isDev', isDev);
    return {
        entry: path.resolve(srcDir, "index.tsx"),
        resolve: {
            modules: ["node_modules"],
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
            alias: {
                "@": srcDir
            }
        },
        watch: isDev,
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
            })
        ],
        devServer: {
            static: outDir,
            historyApiFallback: true,
            hot: true,
            port: 5001
        },
        devtool: isDev ? "cheap-module-source-map" : undefined
    }
};





export default configurationFunc;