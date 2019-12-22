const users = [
  {
    caption: 'user1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

module.exports = {
  title: 'tails',
  tagline: 'customizable e2e paas',
  url: 'https://eankeen.github.io',
  baseUrl: '/',
  // for github.io type urls, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // used for publishing and more
  projectName: 'tails',
  organizationName: 'eankeen',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'doc1', label: 'docs' },
    { doc: 'doc2', label: 'api' },
    { page: 'help', label: 'help' },
    { blog: false, label: 'blog' }
  ],

  users,

  headerIcon: 'img/favicon.ico',
  // footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  colors: {
    primaryColor: '#ff922b',
    secondaryColor: '#f76707'
  },

  /* custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()}`,

  // highlight.js theme to use for syntax highlighting in code blocks.
  highlight: {
    theme: 'default'
  },

  // custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // on page navigation for the current documentation page.
  onPageNav: 'separate',
  // no .html extensions for paths.
  cleanUrl: true,

  // open graph and twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // for sites with a sizable amount of content, set collapsible to true.
  // expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // show documentation's last contributor's name.
  // enableUpdateBy: true,

  // show documentation's last update time.
  // enableUpdateTime: true,

  // you may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/eankeen/tails'
}

