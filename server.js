const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

// Middleware to parse JSON data
app.use(express.json())
app.use(cors())
// Define a route to get all products from the local JSON file
app.get('/api/products', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'products.json')
    const rawData = fs.readFileSync(filePath)
    let data = JSON.parse(rawData)

    const prices = data.map((product) => product.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    const categoryFilter = req.query.category
    if (categoryFilter) {
      data = data.filter((product) => product.category === categoryFilter)
    }

    // Filter by price range (from and to parameters)
    const priceFrom = parseFloat(req.query.from)
    const priceTo = parseFloat(req.query.to)
    if (!isNaN(priceFrom) && !isNaN(priceTo)) {
      data = data.filter(
        (product) => product.price >= priceFrom && product.price <= priceTo
      )
    }

    // Filter by count (true if count === 0, else false)
    const inStockFilter = req.query.inStock
    if (inStockFilter) {
      data = data.filter((product) => product.count !== 0)
    }

    res.json({ products: data, minPrice, maxPrice })
  } catch (error) {
    console.error('Error reading the JSON file or filtering products:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Define a route to get one product from the local JSON file by its id
app.get('/api/products/:id', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'products.json')
    const rawData = fs.readFileSync(filePath)
    const data = JSON.parse(rawData)

    const productId = parseInt(req.params.id)
    const product = data.find((item) => item.id === productId)
    if (product) {
      res.json(product)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (error) {
    console.error('Error reading the JSON file or finding product:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
