import express from 'express'
import checkQuantity from '../middleware/checkQuantity.js'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', checkQuantity, createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
