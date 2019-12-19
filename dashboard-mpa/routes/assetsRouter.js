import path from 'path'

import { Router } from 'express'

const router = Router()

router.get('/css/spectre.min.css', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../node_modules/spectre.css/dist/spectre.min.css')
  )
})

router.get('/css/spectre-exp.min.css', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../node_modules/spectre.css/dist/spectre-exp.min.css')
  )
})

router.get('/css/spectre-icons.min.css', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../node_modules/spectre.css/dist/spectre-icons.min.css'
    )
  )
})

export default router
