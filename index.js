import path from 'path';
import express from 'express';
import { getProjects, validateProjectNames } from './util/getProjects';

const app = express();
const projects = getProjects();
validateProjectNames(projects);

console.log(projects);

projects.forEach(project => {
  app.use(`/projects/${project}`, express.static(path.join(__dirname, 'projects', project)));
});

let projectsFormatted = projects.map(project => {
  return `<li><a href='/projects/${project}'>${project}</a></li>`;
});

app.get('/', (req, res) => {
  res.send(`
    <ul>
    ${projectsFormatted}
    </ul>
  `);
});

app.on('listening', () => console.log('server restarted'));
app.listen(3000);
