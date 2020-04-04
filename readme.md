# tails 🦊

`tails` enables you to view, edit, and organize all your programming projects in one place

**are you tried of**

- creating the same boilerplate when starting new side projects / apps?
  - ex. editorconfig, prettier, eslint, stylelint, vscode
  - ex. webpack w/ hmr, nodemon
- not having good linting / styling configurations, because you are tired of setting them up every time?
- having to search for your project on your hard drive, and find out how to run / access / deploy it?
- leveraging websites purported to solve these problems (ex. jsfiddle, codesandbox, etc), but they come with some other problems
  - sometimes code output is shown in tiny iframe
  - use online code editor, which is _not_ your ide with all the good plugins
  - projects not stored under version control
  - no easy way to see all / organize your projects from all these sites
  - have projects work easily after you download them (if there is a way to download from the site)

**don't you want**

- a tool that helps you organize all your side projects / apps
- a framework, utility, and ide agnostic tool
- something super extensible, allowing you to easily add a plugin to extend the feature set for how _you_ want it to be

here is what it looked like several months ago. since then everything has been refactored and the end goal / architecture is totally different

![tails preview](./tails.png)

## goals

to be a hub for all your projects, and be super extensible via plugins to modify projects however you like. some examples

- plugin that automatically boilerplates configuration for programing projects (ex. using yeoman)
  - creates _perfect_ combo of editorconfig, prettier, eslint, stylelint, and vscode setting to go with it etc.
- plugin that integrated with zeit, netlify etc. one click deploy solutions
- plugin that deploys chosen microservices to kubernetes cluster on demand
- plugin that opens up your project with a browser version of vscode, with all the plugins you need (no extras to slow launch time)
- plugin that gives you integrated dns (so nice urls) during development
- browse through, label, sort, and manage all your projects within the web interface
- leverage the tools that some with your ide as much as possible
- avoid reinventing the wheel

## details

some or most of these should be plugins that come bundled by default

- project type examples
  - web, spa, node, node + spa, deno, c++, scala, etc.
- ability to 'upgrade' web projects
  - ex. 'upgrade' web (static files) to node (importing `express` or `server-static`, etc.)
    - this copies rather than edits to prevent mistakes in upgrade process
  - ex. 'upgrade' (we w/ webpack bundler) + node to non-managed projects
  - similar ejecting for ejecting out of boilerplated config if needed
- showing stdout / stderr
  - maybe have cli so we can just output crap in an existing pty
  - or just for plugins
- linting / style formatting
  - option to have no linting or style formatting (meaning, the editor does everything)
  - or option to have prettier, eslint configs symlinked to project directory and have watch optiosn for auto update
  - or have combo wombo or something
- show generated metadata
  - how much browser support your website has
  - size of codebase gzipped, minified, etc.
- misc
  - open any mount of subprojecs at once without conflicts

## usage

project still in (heavy) early development (pre-alpha)

## contributing

```sh
git clone --recurse-submodules https://github.com/eankeen/tails
yarn install
yarn lerna bootstrap
yarn lerna link
make start
```
