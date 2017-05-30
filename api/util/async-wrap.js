export default function asyncWrap(middleware) {
  return middleware.length <= 3
    ? (req, res, next) => middleware(req, res, next).catch(next)
    : (err, req, res, next) => middleware(err, req, res, next).catch(next)
}
