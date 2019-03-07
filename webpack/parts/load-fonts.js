module.exports = (opts = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: 'file-loader',
        ...opts,
      },
    ],
  },
});
