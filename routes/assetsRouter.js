import path from 'path'
import express from 'express'

const cssRouter = express.Router()

cssRouter.get('/spectre.min.css', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../node_modules/spectre.css/dist/spectre.min.css')
  )
})

cssRouter.get('/spectre-exp.min.css', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../node_modules/spectre.css/dist/spectre-exp.min.css')
  )
})

cssRouter.get('/spectre-icons.min.css', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../node_modules/spectre.css/dist/spectre-icons.min.css'
    )
  )
})

export default { cssRouter }
