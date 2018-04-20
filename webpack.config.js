const path = require("path");

module.exports = (env) => {
    const isProduction = env === 'production';
    
    return {
        entry: [
            path.resolve(__dirname, "./src/app.js")
        ],
        output: {
          path: path.resolve(__dirname, "./public"),
          filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }]
        },  
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' :'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, "./public")
        }
    }
}
