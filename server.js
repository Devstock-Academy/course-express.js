import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import productsRouter from './routes/products.js'

const app = express()
const PORT = process.env.PORT || 5000

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/products', productsRouter)

// Serwer nasłuchuje na porcie 8000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
