module.exports = (opts = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        ...opts,
      },
    ],
  },
});
