module.exports = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png)$/,
        include,
        exclude,
        loader: 'url-loader',
        options: {
          limit: 8000,
          ...options,
        }
      },
    ],
  },
});
