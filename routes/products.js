import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit, 10)
  try {
    if (!isNaN(limit) && limit > 0) {
      const result = await pool.query('SELECT * FROM products LIMIT $1', [
        limit,
      ])
      return res.status(200).json(result.rows)
    }
    const result = await pool.query('SELECT * FROM products')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

router.post('/', async (req, res) => {
  const { name, price, quantity } = req.body
  if (!name || !price || !quantity) {
    return res
      .status(400)
      .json({ message: 'Name, price and quantity are required' })
  }
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, price, quantity]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Insertion failed', error })
  }
})

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { name, price, quantity } = req.body
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [name, price, quantity, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.sendStatus(204) // No Content
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error })
  }
})

export default router
