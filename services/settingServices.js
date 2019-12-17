import path from 'path'
import fs from 'fs'

import puppeteer from 'puppeteer'

import Project from '../models/projectModel'

export async function generateProjectScreenshots() {
  const p = path.join(__dirname, '../public/generated-project-pictures')
  const projects = await Project.getProjects()
  let promises = []
  projects.forEach(async project => {
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('http://localhost:3000/project/' + project.slug)
      const prom = page.screenshot({
        path: path.join(p, project.slug + '.png')
      })
      promises.push(prom)
      await prom
    } catch (err) {
      console.log(err)
    }
  })
  return Promise.all(promises)
}

export async function generateProjectDataAndUpdateDb() {
  const p = path.join(__dirname, '../projects')
  const files = (await fs.promises.readdir(p, {
    withFileTypes: true
  }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  return Promise.resolve(files)
}
