const path = require('path')

module.exports = {
  entry: './src/index.js',
  /*
  optimization: {
    minimize: false,
  },
  */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  externals: [
    'react',
    'react-redux',
    'react-router-dom',
    /redux-saga\/.*/,
    'reselect',
    'downshift',
    'material-table',
    /@material-ui\/.*/,
  ],
}
