const checkQuantity = (req, res, next) => {
  const { quantity } = req.body
  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' })
  }
  next()
}

export default checkQuantity
