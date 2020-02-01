export default {
  base: '/redefy/',
  files: ['./docs/**/*.mdx', './src/**/*.mdx'],
  typescript: true,
  propsParser: false,
  themeConfig: {
    showPlaygroundEditor: false,
    showDarkModeSwitch: false,
    styles: {
      root: {
        fontSize: 2,
      },
      inlineCode: {
        margin: '0 2px',
        padding: '2px 6px',
        borderRadius: '3px',
        backgroundColor: '#ececec',
      },
    },
  },
  menu: [
    {
      name: '开发指南',
      menu: ['介绍', '快速上手', '更新日志'],
    },
    '基础组件',
    '表单组件',
    '交互组件',
  ],
};
