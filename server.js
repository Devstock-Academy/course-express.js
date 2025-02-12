import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 8000
const productsList = [
  { id: 1, name: 'Product A', price: 15 },
  { id: 2, name: 'Product B', price: 25 },
  { id: 3, name: 'Product C', price: 35 },
]
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/json', (req, res) => {
  res.send({ message: 'Hello, JSON response!' })
})

app.get('/products', (req, res) => {
  res.json(productsList)
})

// Serwer nasłuchuje na porcie 8000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
