import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import parts from './data/parts.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send("API is running...")
})

app.get('/api/parts', (req, res) => {
    res.json(parts)
})

app.get('/api/part/:id', (req, res) => {
    const part = parts.find((p) => p._id === parseInt(req.params.id))
    res.json(part)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold))