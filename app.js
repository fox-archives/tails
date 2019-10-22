import path from 'path';
import express from 'express';
import hbs from 'hbs';
import cssRoute from './routes/css';
import { projects } from './controller/projects';

const app = express();

app.enable('case sensitive routing');
app.set('json spaces', 2);
app.disable('strict routing');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.disable('x-powered-by');

app.engine('hbs', hbs.__express);

app.use('/', express.json());
app.use('/', express.urlencoded({ extended: true }));

app.use('/css', cssRoute);
app.use('/', express.static(path.join(__dirname, 'public')));

const packagesDir = path.join(__dirname, 'projects');

(async () => {
  let p = await projects(packagesDir);
  p.forEach(project => {
    app.use(`/projects/${project}`, express.static(path.join(__dirname, 'projects', project)));
  });

  app.get('/', (req, res) => {
    res.render('index', { projects: p });
  });
})();

app.on('listening', () => console.log('server restarted'));
app.listen(3000);
