import path from 'path';
import tarfs from 'tar-fs';
import Docker from 'dockerode';
import constants from '../util/constants';
import Project from '../models/projectModel';

export function projectController(req, res) {
  return Project.getProjectNames()
    .then(projectNames => {
      return Project.getProjectMetaData(projectNames);
    })
    .then(projectData => {
      res.render('projects', {
        hero: {
          header: 'welcome to tails',
          body: 'let\'s get started'
        },
        projects: projectData
      });
    })
    .catch(err => {
      console.log(err);
    });
}

/* not mapped */
export async function projectHost(req, res) {
  const docker = new Docker({
    version: 'v1.40'
  });
  
  const pack = tarfs.pack(path.resolve(__dirname, '..'), {
    ignore(name) {
      if(name.match('node_modules') || name.match('.git')) {
        return true;
      }
  
      console.log(name);
      return false;
    }
  });
  
  docker.buildImage(pack, {
    t: 'tails-app-html-test',
    nocache: true,
    dockerfile: 'dockerfiles/web/Dockerfile',
    buildArgs: JSON.stringify({
      PROJECT: 'html-test',
      TEMPLATE: 'web'
    })
  })
    .then(stream => {
      console.log("stream starting");
      function onProgress(event) {
        console.log(event);
      }
  
      function onFinished(err, res) {
        if(err) {
          console.trace(err);
          return;
        };
  
        // // console.log(res.length)
        docker.run('tails-app-html-test', ['/bin/sh', '-c', 'node index.js'], process.stdout, {
          name: 'container-tails-app-html-test',
          ExposedPorts: {
            '4000/tcp': {}
          },
          Volumes: {
            '/home/developer': {}
          },
          // "Binds": [ "/home/edwin/repos/tails/templates/web:/home/developer:rw" ]
        })
          .then(([ err, container ]) => {
            console.log('error: ', err);
            console.log('container id: ', container.id);
  
            console.log("about to remove container");
            setTimeout(() => {
              container.remove();
              console.log("container removed");
            }, 100)
          })
          .catch(err => {
            console.trace(err);
          })
      }
  
      docker.modem.followProgress(stream, onFinished, onProgress);
    })
    .catch(err => {
      console.trace(err);
    });
}


export function projectImageBuildController(req, res) {
  console.log('project id', req.params.projectId)
  docker.listContainers()
    .then(containers => {
      containers.forEach(container => console.log(container));
    })
    .catch(err => {
      console.log(err);
    });
};
