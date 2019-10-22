import fs from 'fs';
import path from 'path';

// acquiring data about projects

export function projects(projectsDir) {
  return new Promise((resolve, reject) => {
    fs.promises.readdir(projectsDir)
      .then(projects => {
        // contains fs.stat data about each project
        let projectsStatPromise = [];

        projects.forEach(project => {
          let projectFilePath = path.resolve(projectsDir, project);
          projectsStatPromise.push(fs.promises.stat(projectFilePath));
        });

        Promise.all(projectsStatPromise)
          .then(projectsStat => {
            resolve(projects.filter((project, i) => projectsStat[i].isDirectory()));
          })
          .catch(err => {
            console.log(err);
            reject();
          })
      })
      .catch(err => {
        console.log(err);
        reject();
      })
  })

};
