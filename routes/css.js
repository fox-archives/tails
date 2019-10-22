import path from 'path';
import express from 'express';
const router = express.Router();

router.get('/spectre.min.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/spectre.css/dist/spectre.min.css'));
});

export default router;
