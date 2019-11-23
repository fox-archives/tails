import path from 'path';
import fs from 'fs';
export async function updateDatabase(newEntry) {
  return new Promise((resolve, reject) => {
  const p = path.join(__dirname, '../data/projects.json');

  fs.promises.readFile(p)
    .then(content => {
      const jsonData = JSON.parse(content)
      const projectData = jsonData.projects
      projectData.push({
        name: newEntry.projectName,
        slug: newEntry.projectSlug,
        type: newEntry.projectType,
        tags: []
      })
      return JSON.stringify({projects: projectData}, null, 2);
    })
    .then(function writeToProject(newFileData) {
      return fs.promises.writeFile(p, newFileData, {
        encoding: 'utf8',
        flag: 'w'
      });
    })
    .then(() => {
      resolve();
    })
    .catch(err => {
      console.log(err);
      reject();
    });
  });
}

export async function actuallCreateProjectInProjectsFolder({
  projectType,
  projectSlug
}) {
  const p = path.join(__dirname, '../projects');
  await fs.promises.mkdir(path.join(p, projectSlug));
  const f = path.join(p, projectSlug, 'index.html');
  await fs.promises.writeFile(
    f,
    `<!DOCTYPE html>
<html lang="en">
<body lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Tails Project</title>
</head>
<body>
  
</body>
</body>
</html>
`);
}
