import express from 'express'
import listProducts from './src/listProducts.js'
import createOrder from './src/createOrder.js'
import getOrders from './src/getOrders.js'
import axios from 'axios'
import cors from 'cors'
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.get('/product', async (req, res) => {
  const token = req.headers.authorization

  try {
    await authenticate(token)
  }
  catch (err) {
    res.status(401).send('Unauthorized')
    return
  }

  try {
    const products = await listProducts()
    res.send(products)
  }
  catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

app.post('/order', async (req, res) => {
  const token = req.headers.authorization

  let username
  try {
    username = await authenticate(token)
  }
  catch (err) {
    res.status(401).send('Unauthorized')
    return
  }

  try {
    const orderId = await createOrder(username, req.body.products)
    res.send(orderId.toString())
  }
  catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

app.get('/order', async (req, res) => {
  const token = req.headers.authorization

  let username
  try {
    username = await authenticate(token)
  }
  catch (err) {
    res.status(401).send('Unauthorized')
    return
  }

  try {
    const orders = await getOrders(username)
    res.send(orders)
  }
  catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`Order manager listening on port ${port}`)
})

async function authenticate(token) {
  const authUrl = 'http://localhost:3000/authenticate'
  const response = await axios.post(authUrl, { token })
  if (response.status != 200) {
    throw new Error('Invalid token')
  }

  return response.data
}