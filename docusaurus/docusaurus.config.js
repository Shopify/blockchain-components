module.exports = {
  title: 'Blockchain kit',
  tagline:
    "A brief description of the purpose of your microsite or it's content.",
  url: 'https://blockchain-kit.docs.shopify.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Shopify',
  projectName: 'blockchain-kit',
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      additionalLanguages: ['ruby', 'sql'],
    },
    navbar: {
      title: 'Blockchain Kit',
      logo: {
        alt: 'Shopify Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: 'Introduction',
        },
        {
          href: 'https://github.com/shopify/blockchain-kit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/shopify/blockchain-kit',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shopify Inc.`,
    },
  },
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        docsDir: 'docs',
        indexPages: true,
        docsRouteBasePath: '/',
      },
    ],
  ],
  themes: ['@shopify/docusaurus-shopify-theme'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/shopify/blockchain-kit/edit/main/docusaurus/',
        },
        blog: false,
        pages: false,
        sitemap: false,
      },
    ],
  ],
};
