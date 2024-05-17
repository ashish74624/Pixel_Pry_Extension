import express from 'express'
import { addFolder , deleteFolder } from '../controllers/docController.js'

const router = express.Router();

router.post('/:email/addFolder',addFolder);
router.delete('/deleteFolder',deleteFolder)

export default router;