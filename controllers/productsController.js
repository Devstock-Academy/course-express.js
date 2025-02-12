import pool from '../db.js'

export const getProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit)
    if (!isNaN(limit) && limit > 0) {
      const result = await pool.query('SELECT * FROM products LIMIT $1', [
        limit,
      ])
      return res.status(200).json(result.rows)
    }
    const result = await pool.query('SELECT * FROM products')
    res.status(200).json(result.rows)
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ])
    if (result.rows.length === 0) {
      const err = new Error('Product not found')
      err.status = 404
      return next(err)
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body
    if (!name || !price || !quantity) {
      const err = new Error('Name, price and quantity are required')
      err.status = 400
      return next(err)
    }
    const result = await pool.query(
      'INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, price, quantity]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const { name, price, quantity } = req.body
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [name, price, quantity, id]
    )
    if (result.rows.length === 0) {
      const err = new Error('Product not found')
      err.status = 404
      return next(err)
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id])
    if (result.rowCount === 0) {
      const err = new Error('Product not found')
      err.status = 404
      return next(err)
    }
    res.sendStatus(204).json({ message: 'Product deleted successfully' })
  } catch (error) {
    next(error)
  }
}
