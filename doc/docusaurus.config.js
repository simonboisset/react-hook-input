const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'react-hook-input',
    tagline: 'Make your form easyer',
    url: 'https://react-hook-input.simonboisset.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'simonboisset',
    projectName: 'react-hook-input',

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            editUrl: 'https://github.com/simonboisset/react-hook-input/doc',
          },
          blog: {
            showReadingTime: true,
            editUrl: 'https://github.com/simonboisset/react-hook-input/doc/blog/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'Home',
          logo: {
            alt: 'Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'doc',
              docId: 'intro',
              position: 'left',
              label: 'Doc',
            },
            { to: '/blog', label: 'Blog', position: 'left' },
            {
              href: 'https://github.com/simonboisset/react-hook-input',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Tutorial',
                  to: '/docs/intro',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Simon Boisset',
                  href: 'https://github.com/simonboisset',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/simonboisset/react-hook-input',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} simonboisset, Inc. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
