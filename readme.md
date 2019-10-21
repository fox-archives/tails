# tails

blabbering / brainstorm

## to implement

- folder structure
- web (no bundler) and web (parcel)
- basic ui
- clicking on project in ui actually launches it (no containerization for now)

## .tails.yml

name: whatever
description: whatever
type: web (no bundler) || web (parcel bundler, webpack) || node || complex (parcel bundler, or webpck and node server)
tags: [a, b, c]
category: whatever
image: whatever

## notes

- can graduate 'web' project to 'node', or 'deno'
- make it easy to transfer 'complex' projects out of this structure
- lerna implementation or just encourage symlinks?
- need some way of showing console for the web w/ bundlers and node!
  - do we need to show console?
  - definitely for web w/ bundler, can just do it for no bundler for consistency
what do we need 'complex' for?
- server for development and actual backend server
  - use parcel instead?
    - have option to use manual webpack dev server

## types

### web (no bundler)

- just staticaly serving content in directory
  - why chose over web w/ bundler?
- standalone (cannot be converted to web w/ bundler or to complex)

### web (bundler)

- literally just parcel serving crap
- add parcel proxying when converting to 'complex'

### node

- literally just node / nodemon
  - have options for

## development

- open any subprojects whenever, any at the same time
- containerization optional
  - like if im working on sockets, i dont want to have containers to mess up connection?
- nice domains during development
  - remember web, node, and deno stuff probably wont go to prod
- start from web interface or via the cli

## production

- web page accessable to anyone
  - public or local server
- web page lists projects
  - click on project, start pods, services, and ingresses
- pods die down after closing project
