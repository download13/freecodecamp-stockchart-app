module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname + '/public',
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: [
                        'syntax-jsx',
                        ['transform-react-jsx', {pragma: 'element'}]
                    ]
                }
            }
        ]
    }
};