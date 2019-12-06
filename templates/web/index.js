let http = require('http')
let serveStatic = require('serve-static')

http
  .createServer(function(req, res) {
    serveStatic(process.env.SERVE_DIR, {
      index: 'index.html'
    })(req, res)
  })
  .listen(4000, '0.0.0.0')
