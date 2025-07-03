//Task 1 Express JS Setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

//Task 2 Creating a Resource called 'products'
const { v4: uuidv4} = require('uuid');
let products = [
  { id : uuidv4(), 
    name: "Laptop",
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "electronics",
    inStock: true
  },
  { id : uuidv4(),
    name: "Smartphone",
    description: "Latest model with 128GB storage",
    price: 800,
    category: "electronics",
    inStock: true
  },
  { id : uuidv4(),
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer",
    price: 50,
    category: "kitchen",
    inStock: false

  }
];

//Parsing JSON data
app.use(express.json());

//Implementing RESTful API
//List all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

//Get a product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
});

//Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//Update an existing product
app.put('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[productIndex] = {
    ...products[productIndex],
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };

  res.json(products[productIndex]);
});

//Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  products.splice(productIndex, 1);
  res.status(204).send();
  }
});

// Task 3 Middleware implementation
//Create a custom middleware that logs the request method, URL, and timestamp
const loggerMiddleware = (req, res, next) => {
  console.log("${req.method} request to ${req.url} at ${new Date().toISOString()}");
  next();
};
app.use(loggerMiddleware);

//Implement a middleware to parse JSON request bodies
app.use(express.json());

//Create authentication middleware for an API key in the reuest headers
const authenticationMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== '1234567') {
    return res.status(401).json({ message: "Unauthorized-Invalid API key" });
  }
  next();
};
//Add a validation middleware for the product creation
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if(
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  )
  {
    return res.status(400).json({ error: "Invalid Product data"});
  }
  next();
};

//Add validation middleware for the product update routes
const router = express.Router();
router.use((req, res, next) => {
  console.log("Validation middleware for product update");
  next();
});
 router.post("api/products", validateProduct, (req, res) => {
  const newProduct = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
 });

 router.put("/api/products/:id", validateProduct, (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({error: "Product not found"});
  products.splice(productIndex, 1);
  res.status(204).send();
  };
 });

 router.delete("/api/products/:id", authenticationMiddleware, (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(productIndex, 1);
  res.status(204).send();
 });

 //Task 4 Error Handling
 //Implement a global error handling middleware
 app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error: "Internal Server Error"});
 });

 //Create custom error classes for different types of errors
 class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
 }
 class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
 }

//Task 5 Advanced Features
//Implement query parameters for filtering products by category
app.get('/api/products', (req, res) => {
  const { category } =req.query;
  if (category) {
    const filteredProducts = products.filter(p => p.category === category);
    return res.json(filteredProducts);
  };
  res.json(products);
});

//Add pagination support for the product listing endpoint
app.get('/api/products', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  res.json({
    total: products.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: paginatedProducts
  });
});

//Create a search endpoint that allows searching products by name
app.get('/api/products/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }
  const searchResults = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  res.json(searchResults);
});

//Implement route for getting product statistics
// Product count by category
app.get('/api/products/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  
  res.json(stats);
});

// Exporting app for testing purposes# 📦 Express.js Products API

module.exports = app;








