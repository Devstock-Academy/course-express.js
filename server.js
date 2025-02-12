import express from 'express'
import path from 'path'

import { fileURLToPath } from 'url'
import productsRouter from './routes/products.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logger)

app.use('/api/products', productsRouter)

app.use(notFound)

app.use(errorHandler)

// Serwer nasłuchuje na porcie 8000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
