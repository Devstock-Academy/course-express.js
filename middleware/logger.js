import colors from 'colors'
const logger = (req, res, next) => {
  console.log(
    colors.bgMagenta(`Method: ${req.method}`),
    colors.green(`URL: ${req.originalUrl}`),
    colors.yellow(`Protocol: ${req.protocol}`)
  )
  next()
}

export default logger
