import path from 'path' // has path and __dirname
import express from 'express'
const router = express.Router()

router.get('/', (req,res) => res.sendFile(path.join(__dirname, '../public/clientAuthenticate.html')))

router.get('/app', (req,res) => res.sendFile(path.join(__dirname, '../public/clientApp.html')))

export default router;