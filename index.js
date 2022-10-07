// ? Level 1 : Basic Server

// const express = require('express')

// // Init express

// const app = express()

// // Listen on a port

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))

//? Level 2 : Basic Routing

const express = require('express')

// Init express

const app = express()

// Create Route Handlers

app.get('/', (req, res) => {
    console.log('Hello World !')
    res.end("Hello World !")
})

app.get('/home', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html " })
    res.end("<h1>Home Page</h1>")
})
// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))

