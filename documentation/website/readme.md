this website was created with [docusaurus](https://docusaurus.io/).

# what's in this document

* [get started in 5 minutes](#get-started-in-5-minutes)
* [directory structure](#directory-structure)
* [editing content](#editing-content)
* [adding content](#adding-content)
* [full documentation](#full-documentation)

# get started in 5 minutes

1. make sure all the dependencies for the website are installed:

```sh
# install dependencies
$ yarn
```
2. run your dev server:

```sh
# start the site
$ yarn start
```

## directory structure

your project file structure should look something like this

```
my-docusaurus/
  docs/
    doc-1.md
    doc-2.md
    doc-3.md
  website/
    blog/
      2016-3-11-oldest-post.md
      2017-10-24-newest-post.md
    core/
    node_modules/
    pages/
    static/
      css/
      img/
    package.json
    sidebar.json
    siteconfig.js
```

# editing content

## editing an existing docs page

edit docs by navigating to `docs/` and editing the corresponding document:

`docs/doc-to-be-edited.md`

```markdown
---
id: page-needs-edit
title: this doc needs to be edited
---

edit me...
```

for more information about docs, click [here](https://docusaurus.io/docs/en/navigation)

## editing an existing blog post

edit blog posts by navigating to `website/blog` and editing the corresponding post:

`website/blog/post-to-be-edited.md`
```markdown
---
id: post-needs-edit
title: this blog post needs to be edited
---

edit me...
```

for more information about blog posts, click [here](https://docusaurus.io/docs/en/adding-blog)

# adding content

## adding a new docs page to an existing sidebar

1. create the doc as a new markdown file in `/docs`, example `docs/newly-created-doc.md`:

```md
---
id: newly-created-doc
title: this doc needs to be edited
---

my new content here..
```

1. refer to that doc's id in an existing sidebar in `website/sidebar.json`:

```javascript
// add newly-created-doc to the getting started category of docs
{
  "docs": {
    "getting started": [
      "quick-start",
      "newly-created-doc" // new doc here
    ],
    ...
  },
  ...
}
```

for more information about adding new docs, click [here](https://docusaurus.io/docs/en/navigation)

## adding a new blog post

1. make sure there is a header link to your blog in `website/siteconfig.js`:

`website/siteconfig.js`
```javascript
headerlinks: [
    ...
    { blog: true, label: 'blog' },
    ...
]
```

2. create the blog post with the format `yyyy-mm-dd-my-blog-post-title.md` in `website/blog`:

`website/blog/2018-05-21-new-blog-post.md`

```markdown
---
author: frank li
authorurl: https://twitter.com/foobarbaz
authorfbid: 503283835
title: new blog post
---

lorem ipsum...
```

for more information about blog posts, click [here](https://docusaurus.io/docs/en/adding-blog)

## adding items to your site's top navigation bar

1. add links to docs, custom pages or external links by editing the headerlinks field of `website/siteconfig.js`:

`website/siteconfig.js`
```javascript
{
  headerlinks: [
    ...
    /* you can add docs */
    { doc: 'my-examples', label: 'examples' },
    /* you can add custom pages */
    { page: 'help', label: 'help' },
    /* you can add external links */
    { href: 'https://github.com/facebook/docusaurus', label: 'github' },
    ...
  ],
  ...
}
```

for more information about the navigation bar, click [here](https://docusaurus.io/docs/en/navigation)

## adding custom pages

1. docusaurus uses react components to build pages. the components are saved as .js files in `website/pages/en`:
1. if you want your page to show up in your navigation header, you will need to update `website/siteconfig.js` to add to the `headerlinks` element:

`website/siteconfig.js`
```javascript
{
  headerlinks: [
    ...
    { page: 'my-new-custom-page', label: 'my new custom page' },
    ...
  ],
  ...
}
```

for more information about custom pages, click [here](https://docusaurus.io/docs/en/custom-pages).

# full documentation

full documentation can be found on the [website](https://docusaurus.io/).
