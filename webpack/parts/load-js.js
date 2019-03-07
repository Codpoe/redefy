module.exports = (opts = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        ...opts,
      }
    ],
  },
});
