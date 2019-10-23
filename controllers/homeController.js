import Project from '../models/projectModel';

export async function homeController(req, res) {
  try {
    let p = await Project.getAll();

    res.render('home', {
      projects: p,
      hero: {
        header: 'welcome to tails',
        body: 'let\'s get started'
      }
    });
  }
  catch(err) {
    console.log(err);
  }
}
