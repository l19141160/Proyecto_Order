import express from 'express'
import register from './src/register.js'
import login from './src/login.js'
import list from './src/list.js'
import authenticate from './src/authenticate.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

app.post('/register', (req, res) => {
  register(req.body.username, req.body.password).then(() => {
    res.send('OK')
  }).catch((err) => {
    console.error(err)
    res.status(500).send(err)
  })
})

app.post('/login', (req, res) => {
  login(req.body.username, req.body.password).then((token) => {
    res.send(token)
  }).catch((err) => {
    console.error(err)
    res.status(500).send(err)
  })
})

app.post('/authenticate', (req, res) => {
  authenticate(req.body.token).then((username) => {
    res.send(username)
  }).catch((err) => {
    console.error(err)
    res.status(401).send(err)
  })
})

app.get('/list', (req, res) => {
  list().then((rows) => {
    res.send(rows)
  }).catch((err) => {
    console.error(err)
    res.status(500).send(err)
  })
})

app.listen(port, () => {
  console.log(`User manager listening on port ${port}`)
})