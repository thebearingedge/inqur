require('dotenv/config')
const createClient = require('./create-client')

const dev = process.env.NODE_ENV !== 'production'

createClient({ dev })
  .then(app => app.listen(process.env.CLIENT_PORT, () => {
    // eslint-disable-next-line
    dev && console.log(`client listening on port ${process.env.CLIENT_PORT}`)
  }))
