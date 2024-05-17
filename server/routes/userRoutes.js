import express from 'express' 
import {register,login,verifyToken} from '../controllers/userController.js'

const router = express.Router();

router.post('/register',register)
router.post('/login', login);
router.get('/verifyToken', verifyToken);

export default router;