# tails

## summary

`tails` enables you to view, edit, and organize all your javascript projects in one place

if you're like me, you are tired of repeating the same boilerplate when creating frontend web applications, node backends, and so on. it also gets annoying going in each project subdirectory, opening the command line, starting the app, checking the port, and navigating to it via the browser. stuff like hot reload, auto-reload on file watches do not come out of the box and have to be set up _every single time_. websites such as jsfiddle and codesandbox solve some of the issue, but the main problem is that you cannot typically edit the source code with your normal tools. (you must use the web editor, rather than your ide of choice). also, your projects are not tracked by any vcs and they are not stored on your computer. tails allieviates all those problems

![tails preview](./tails.png)

### goals

in short, you can do the following with tails

- place any javascript project in a _single_ directory (symlinked or git submodule, etc.)
- use your standard ide tools to edit these projects
- view all projects in said directory in a web interface
- control properties of projects in said web interface
- deploy any of all of said projects at once, locally, or for production
  - locally: nice urls during deveopment
  - production: deploy containerized apps with orchestration software

## details

- proposed project types
  - web (just serving static files)
  - web (w/ parcel bundler) or (custom bundler (webpack, rollup))
  - web (w/ any bundler) + node
  - node
  - deno
- ability to 'upgrade' web projects
  - ex. 'upgrade' web (static files) to node (importing `express` or `server-static`, etc.)
  - ex. 'upgrade' (we w/ webpack bundler) + node to out of project
- the `projects` directory
  - contains folders, each of which have separate vcs and / or repos
  - contains project metadata in `.tails.y(a)ml`
  - symlinks to actual projects or git submodules
- showing stdout / stderr
  - maybe have cli so we can just output crap in an existing pty
  - if not, need alt method
- web interface
  - home tab
    - displays recent activity, starred items, stats, and quick actions for creating projects
  - projects tab
    - displays all projects in grid fashion

## development

- open any subprojects whenever, any at the same time
- containerization optional
  - like if im working on sockets, i dont want to have worry about sockets bouncing around
- nice domains during development
  - remember web, node, and deno stuff probably wont go to prod
- start from web interface or via the cli

## production

- choose which projects to deploy
- web page accessable to anyone
  - public or local server
- web page lists projects
  - click on project, start pods, services, and ingresses
- pods die down after closing project (with delay)
