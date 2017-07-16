const session = require('express-session')
const RedisStore = require('connect-redis')(session)

module.exports = () => session({
  resave: true,
  sameSite: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  expires: process.env.SESSION_EXPIRY,
  store: new RedisStore({ url: process.env.REDIS_URL }),
  cookie: {
    domain: process.env.DOMAIN,
    secure: process.env.NODE_ENV === 'production'
  }
})
