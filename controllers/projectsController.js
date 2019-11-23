import path from 'path';
import puppeteer from 'puppeteer';

import Project from '../models/projectModel';
import { launchCode } from '../services/fetchProjects';
import { updateDatabase, actuallCreateProjectInProjectsFolder } from '../services/newProject';

export function projectsController(req, res) {
  Project.getProjects().then(projects => {
    res.render('projects', {
      hero: {
        header: 'welcome to tails',
        body: "let's get started"
      },
      projects: projects
    });
  });
}

export function newProjectController(req, res) {
  res.render('new-project', {
    hero: {
      header: 'create new project'
    }
  });
}

export async function projectCreateController(req, res) {
  const { projectName, projectType, projectDesc, projectSlug } = req.body;

  await updateDatabase({ projectName, projectType, projectDesc, projectSlug });
  await actuallCreateProjectInProjectsFolder({
    projectType,
    projectSlug
  });

  res.redirect('/projects');
}

export function openController(req, res) {
  const pathToProject = path.join(__dirname, '../projects', req.params.project);
  launchCode(pathToProject);
  console.log(req.params.project);
  res.redirect(req.get('referer'));
}


export async function photographController(req, res) {
  const p = path.join(__dirname, '../public/generated-project-pictures');
  // try { 
  const projects = await Project.getProjects()
  // } catch (err ) {
  //   console.error(err);
  // }
  let promises = [];
  projects.forEach(async project => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://localhost:3004/project/' + project.slug);
      const prom = page.screenshot({
        path: path.join(p, project.slug + '.png')
      });
      promises.push(prom);
      await prom;
    } catch (err) {
      console.log(err);
    }
  });
  Promise.all(promises).then(() => res.redirect(req.get('referer')) );
}
