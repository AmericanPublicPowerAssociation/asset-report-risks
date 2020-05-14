module.exports = {
  output: {
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
    'downshift',
    'material-table',
    'react',
    'react-redux',
    'react-router-dom',
    'reselect',
    /@material-ui\/.*/,
    /redux-saga\/.*/,
  ],
}
