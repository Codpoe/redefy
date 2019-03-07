module.exports = (opts = {}) => ({
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'babel-loader',
          '@codpoe/react-markdown-loader'
        ],
        ...opts,
      },
    ],
  },
});
