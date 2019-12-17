export function rootController(req, res) {
  res.redirect('/projects')
}

export function errorController(req, res) {
  res.render('pages/error', {
    hero: {
      header: 'oops!',
      body: 'there was an unexpected error'
    }
  })
}
