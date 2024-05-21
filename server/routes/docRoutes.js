import express from 'express'
import { addFolder , deleteFolder, renameFolder } from '../controllers/docController.js'

const router = express.Router();

router.post('/:email/addFolder',addFolder);
router.delete('/deleteFolder',deleteFolder)
router.patch('/renameFolder/:email',renameFolder);

export default router;