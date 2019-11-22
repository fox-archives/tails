import express from 'express';
import serveStatic from 'serve-static';
import Project from '../models/projectModel';

export function projectController(req, res) {
  res.send('bravo');
}

// i guess this is redundant for now, but later we can turn it into
// something where we toggle things 'private' and 'public'
export function projectCheckIfShouldBeShown(req, res, next) {
  Project.getProjects()
    .then(projects => {
      const particularProjectIsNotPrivate = true;
      if(particularProjectIsNotPrivate) {
        next();
      }
    });
}

export function showProject(req, res, next) {
  // './projects' relative to process.cwd()
  const serve = serveStatic('./projects');
  serve(req, res, next);
}
