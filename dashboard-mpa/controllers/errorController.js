export function errorController(err, req, res, next) {
  res.status(500)
  console.log(err)
  res.render('pages/error', {
    error: 'error: ' + err.message,
    linkBack: req.get('referer')
  })
}
