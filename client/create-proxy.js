const { Router } = require('express')
const proxy = require('express-http-proxy')

module.exports = function createProxy() {
  return new Router()
    .post('/authenticate', proxy(process.env.API_URL, {
      parseReqBody: false,
      userResDecorator: (pRes, pBody, cReq, cRes) => {
        if (pRes.statusCode !== 201) return pBody
        const { token, user } = JSON.parse(pBody.toString('utf8'))
        Object.assign(cReq.session, { token, user })
        return { user }
      }
    }))
    .use('/', proxy(process.env.API_URL, {
      parseReqBody: false
    }))
}
