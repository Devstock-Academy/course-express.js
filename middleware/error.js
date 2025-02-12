const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message })
  }
  res.status(500).json({ message: 'Something went wrong' })
}

export default errorHandler
