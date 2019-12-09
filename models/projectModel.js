import fs from 'fs'
import path from 'path'

function Project(
  name,
  type,
  desc,
  slug 
) {
  this.name = name,
  this.type = type,
  this.desc = desc,
  this.slug = slug 
}

Project.create = function({
  name,
  type,
  desc,
  slug 
}) {
  return new Project({
    name,
    type,
    desc,
    slug 
  })
}

Project.lookupProject = async function({ projectName }) {
  const projects = await readProjects()

  if(Project.alreadyExists(projectName)) {

  } else {
    return new Error('project does not exist')
  }
}
Project.prototype.add = async function() {
  const projects = await readProjects()

  // if project does not already exist

}

Project.prototype.remove = async function() {
  const projects = await readProjects()
}

Project.getProjects = async function() {
  await readProjects()
}

Project.alreadyExists = async function(projectName) {
  const projects = await readProjects()
  for(let i = 0; i < projects.length; ++i) {
    const existingProject = projects[i]
    if(existingProject.name === projectName) {
      return true
    }
  }
  return false
}

export default Project


async function readProjects() {
  const dir = path.join(__dirname, '../data/projects.json')
  const data = await fs.promises.readFile(dir)
  return JSON.parse(data).projects
}
