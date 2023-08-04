import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { IBuildEnv } from './src/build/type'
import { buildDevServer } from './src/build/buildDevServer'

export default (env: IBuildEnv) => {
    const port = env.port || 3000
    const isDev = env.mode || 'development' === 'development'

    const config: webpack.Configuration = {
        mode: env.mode || 'development',
        entry: './src/index.tsx',

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: (resPath: string) =>
                                        Boolean(resPath.includes('.module.')),
                                    localIdentName: isDev
                                        ? '[name]__[local]_[hash:base64:8]'
                                        : '[hash:base64:8]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            preferAbsolute: true,
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            mainFiles: ['index'],
            alias: {},
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new webpack.ProgressPlugin(),
        ],
        devServer: buildDevServer(port),
        devtool: isDev ? 'inline-source-map' : undefined,
    }

    return config
}
