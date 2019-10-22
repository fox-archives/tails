import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { projects } from './controller/projects';

const app = express();

app.enable('case sensitive routing');
app.set('json spaces', 2);
app.disable('strict routing');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.engine('html', ejs.renderFile);

app.use('/', express.json());
app.use('/', express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

const packagesDir = path.join(__dirname, 'projects');

(async () => {
  let p = await projects(packagesDir);
  p.forEach(project => {
    app.use(`/projects/${project}`, express.static(path.join(__dirname, 'projects', project)));
  });
})();

app.get('/', (req, res) => {
  projects(packagesDir)
    .then(projects => {
      let projectsFormatted = projects.map(project => {
        return `<li><a href='/projects/${project}'>${project}</a></li>`;
      });

      res.send(`
        <ul>
          ${projectsFormatted}
        </ul>
      `);
    })
});
app.on('listening', () => console.log('server restarted'));
app.listen(3000);
