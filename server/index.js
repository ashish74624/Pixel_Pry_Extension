// This is g1 the normal one

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import folderRoutes from './routes/folderRoutes.js'
import docRoutes from './routes/docRoutes.js'

const app = express();

app.use(cors({
  origin: ['https://image-get.vercel.app','https://imagedrop.vercel.app','https://image-drop-ashish74624.vercel.app','http://localhost:3000','http://localhost:3001'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }))// For body parsing

dotenv.config();

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
});

app.use('/api/users',userRoutes)
app.use('/api/doc',docRoutes)
app.use('/',folderRoutes)

app.get('/',async(req,res)=>{
    res.status(200).json("Hello There !")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port : ${process.env.PORT}`)
});
