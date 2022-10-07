// ? Level 1 : Basic Server

// const express = require('express')

// // Init express

// const app = express()

// // Listen on a port

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))

//? Level 2 : Basic Routing

// const express = require('express')

// // Init express

// const app = express()

// // Create Route Handlers

// app.get('/', (req, res) => {
//     console.log('Hello World !')
//     res.end("Hello World !")
// })

// app.get('/home', (req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html " })
//     res.end("<h1>Home Page</h1>")
// })
// // Listen on a port

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))

//? Level 3 : Files Serving

const express = require('express')
const path = require('path')

// Init express

const app = express()

// File serving

app.use(express.static('public'))
// app.use('/public', express.static(path.join(__dirname, 'public')))

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

//? Level 4 : Validation using joi

//? Level 5 : Logging Data

//? Level 6 : Logging Data using Morgan

//? Level 7 : Authentification using jwt
