import path from 'path'
import fs from 'fs'

import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import serve from 'koa-static'
import mount from 'koa-mount'

const app = new Koa()

app.use(logger())
app.use(helmet())
fs.promises.readdir(path.join(__dirname, '../projects'), {
  withFileTypes: true
})
  .then(dirents => {
    const projects = dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
  
    projects.forEach(project => {
      app.use(mount(
        '/' + project,
        serve(path.join(__dirname, '../projects', project))
      ))
      console.log(project)
    })
    app.use((ctx, next) => {
      if (projects.includes(ctx.url.slice(1)))
        return ctx.redirect(`${ctx.url}/index.html`)
    })

  })

app.on('error', err => console.error('e: ', err))

app.listen(3030)
