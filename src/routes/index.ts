import path from 'node:path';
import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, '../views/index.html'))
});

export const indexRouter = router;
