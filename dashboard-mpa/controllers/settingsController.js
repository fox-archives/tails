import axios from 'axios'

export function settingsController(req, res) {
  res.render('pages/settings', {
    hero: {
      header: 'settings',
      body: 'fine tune app behavior'
    }
  })
}

export function generateScreenshots(req, res) {

}

export function generateProjects(req, res) {

}
