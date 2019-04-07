module.exports = (api) => {
  api && api.cache(false);

  const { BABEL_MODULE, NODE_ENV } = process.env;
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test';

  return {
    'presets': [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs',
        },
      ],
      '@babel/preset-react',
    ],
    'plugins': [
      ['@babel/plugin-transform-runtime', { useESModules }],
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ],
  };
};