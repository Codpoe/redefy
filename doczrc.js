export default {
  base: '/redefy/',
  files: ['./docs/**/*.mdx', './src/**/*.mdx'],
  typescript: true,
  propsParser: false,
  themeConfig: {
    showDarkModeSwitch: false,
  },
  menu: [
    {
      name: '开发指南',
      menu: ['介绍', '快速上手', '更新日志'],
    },
  ],
};
