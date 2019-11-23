# tails 🦊

`tails` enables you to view, edit, and organize all your javascript projects in one place

if you're like me, you're tired of repeating the same boilerplate when creating frontend web applications, node backends, and so on. it also gets annoying going in each project subdirectory, opening the command line, starting the app, checking the port, and navigating to it via the browser. stuff like hot reload, auto-reload on file watches do not come out of the box and have to be set up _every single time_, especially if you wish to experiement with something not setup by create-react-app, vue-cli, etc. websites such as jsfiddle and codesandbox solve some of the issue, but the main problem is that you cannot typically edit the source code with your normal tools. (you must use the web editor, rather than your ide of choice). also, your projects are not tracked by any vcs and they are not stored on your computer. tails allieviates all these problems

![tails preview](./tails.png)

## goals

- main idea: paas for running *trusted* code (small-medium-sized codebases)
- use your standard ide tools to edit these projects
- view projects directly in browser
- browse through, label, sort, and manage all your javascript projects within the web interface
- start projects on demand, *quickly*
- have nice urls during development (no localhost and port crap, all managed for you)
- generate helm charts to run on kubernetes for prod
  - such that crap *just works™*

## details

- proposed project types
  - web (static files)
  - spa (parcel, webpack, or rollup bundlers)
  - node
  - node + spa (parcel, webpack, or rollup bundlers)
  - deno
- ability to 'upgrade' web projects
  - ex. 'upgrade' web (static files) to node (importing `express` or `server-static`, etc.)
    - this copies rather than edits to prevent mistakes in upgrade process
  - ex. 'upgrade' (we w/ webpack bundler) + node to out-of-tails-project (since projects shouldn't inherently be tightly coupled to tails)
- the `projects` directory
  - flat tree structure of projects
- showing stdout / stderr
  - maybe have cli so we can just output crap in an existing pty
    - only for running it for testing it out (not for during development, since we have vscode console for that)
- linting / style formatting
  - option to have no linting or style formatting (meaning, the editor does everything)
  - or option to have prettier, eslint configs symlinked to project directory and have watch optiosn for auto update
  - should we make it easy to lint whole project and change linting of all projects, or just on single project basis? both?
    - reverting should be easy
  - or have combo wombo or something
- show generated metadata
  - how much browser support your website has
  - size of codebase gzipped, minified, etc.

### development

- open any mount of subprojecs at once without conflicts
  - containerization of non web (static) sites
- nice domains during development
- cli?

### production

- choose which projects to deploy
- such that stable for production
- web page lists projects
  - click on project, start pods, services, and ingresses
