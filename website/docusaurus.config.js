module.exports = {
  title: 'X-RC',
  tagline: '一套简单的 React 组件库',
  url: 'localhost:3000',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'toolman',
  projectName: 'x-rc',
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: 'X-RC',
      logo: {
        alt: 'x-rc',
        src: 'img/logo.svg',
      },
      links: [
        { label: '文档', to: 'docs/introduction', position: 'left' },
        {
          label: 'GitHub',
          href: 'https://github.com/codpoe/x-rc',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '介绍',
              to: 'docs/introduction',
            },
            {
              label: '快速上手',
              to: 'docs/quick-start',
            },
          ],
        },
        {
          title: '帮助',
          items: [
            {
              label: '代码仓库',
              href: 'https://github.com/codpoe/x-rc',
            },
            {
              label: '微博',
              href: 'https://weibo.com/u/2757541610',
            },
          ],
        },
      ],
      logo: {
        alt: 'x-rc',
        src: 'https://docusaurus.io/img/oss_logo.png',
        href: 'https://github.com/codpoe/x-rc',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Codpoe. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
};
