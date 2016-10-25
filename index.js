const { createServer } = require('http')
const Gun = require('gun')

const env = process.env.NODE_ENV || 'development'
const port = process.env.port ||
  (process.argv[2] === '--' // if called from an npm script use next arg
    ? process.argv[3]
    : process.argv[2]) ||
  8080 // default port

let gunConfig = {}

if (env === 'production') {
  gunConfig.s3 = {
    key: process.env.S3_KEY, // AWS Access Key
    secret: process.env.S3_TOKEN, // AWS Secret Token
    bucket: process.env.S3_BUCKET // The bucket you want to save into
  }
} else {
  gunConfig.file = 'data.json'
}

const gun = Gun(gunConfig)

const server = createServer((req, res) => {
  if (!gun.wsp.server(req, res)) {
    res.statusCode = 404
    res.end()
  }
})

gun.wsp(server, (req, res, next) => {
  console.log(req, res)
  next(req, res)
})
server.listen(port, () => {
  console.log(`GunDB server listening on 127.0.0.1:${port}`)
})
