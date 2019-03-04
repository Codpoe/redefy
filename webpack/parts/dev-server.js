module.exports = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host: host || 'localhost',
    port: port || 8008,
    overlay: true,
    historyApiFallback: true,
  },
});
