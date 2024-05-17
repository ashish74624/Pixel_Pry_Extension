import express from 'express'
import { getFolderData,getFolders,getImage,uploadImage,deleteImage } from '../controllers/folderController.js'

const router = express.Router();

router.get('/:email/getFolders',getFolders);

router.get('/getFolderData/:email/:folderName', getFolderData);

router.get('/:email/:folderName/:image',getImage);

router.post('/:email/upload',uploadImage);

router.delete('/deleteImage/:id', deleteImage);

export default router;