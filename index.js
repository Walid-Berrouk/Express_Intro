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

// const express = require('express')
// const path = require('path')

// // Init express

// const app = express()

// // File serving

// app.use(express.static('public'))
// // app.use('/public', express.static(path.join(__dirname, 'public')))

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

//? Level 4 : Validation using joi

// const express = require('express')
// const path = require('path')
// const Joi = require('joi');

// // Init express

// const app = express()

// // Data Schema
// const schema = Joi.object({
//     title: Joi.string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     birth_year: Joi.number()
//         .integer()
//         .min(1900)
//         .max(2013),
// })

// // File serving

// app.use(express.static('public'))
// // app.use('/public', express.static(path.join(__dirname, 'public')))

// // Create Route Handlers
// app.get('/', (req, res) => {
//     console.log('Hello World !')
//     res.end("Hello World !")
// })

// app.get('/home', (req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html " })
//     res.end("<h1>Home Page</h1>")
// })

// app.post('/profile', (req, res) => {
//     const profile = req.query

//     const result = schema.validate({
//         title: profile.title,
//         birth_year: parseInt(profile.birth_year)
//     })

//     res.end(JSON.stringify(result))
// })

// // Listen on a port

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))

//? Level 5 : Logging Data

// const express = require('express')
// const path = require('path')
// const myLogger = require('./middlewares/logger')

// // Init express

// const app = express()

// // Logger 

// app.use(myLogger)

// // File serving

// app.use(express.static('public'))
// // app.use('/public', express.static(path.join(__dirname, 'public')))

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


//? Level 6 : Logging Data using Morgan

// const express = require('express')
// const path = require('path')
// const Logger = require("morgan")
// const fs = require('fs')

// // Init express

// const app = express()

// // create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, "storage", "logsMorgan.txt"), { flags: 'a' })
 
// // Logger 
// app.use(Logger('combined', { stream: accessLogStream }))


// // File serving

// app.use(express.static('public'))
// // app.use('/public', express.static(path.join(__dirname, 'public')))

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

//? Level 7 : Authentification using jwt


const express = require('express')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const verifyToken = require('./middlewares/verifyToken')

const secretKey = 'youCantCatchme098765%^&*##@'

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

app.get('/home', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.writeHead(200, { "Content-Type": "text/html " })
            res.end("<h1>Home Page</h1>")
        }
    })
})

app.post('/api/login', async (req, res) => {
    try {
        const users = require("./storage/users.json")

        // On suppose que le username est unique
        const user = users.find(user => (user.username === req.query.username) && (user.password === req.query.password))

        const { username, password } = user

        if (user) {
            // const token = await jwt.sign({user}, secretKey)
            jwt.sign({ username, password }, secretKey, { expiresIn: '30s' }, (err, token) => {
                res.send({
                    token
                })
            })
        } else {
            res.writeHead(400)
            res.end("Incorrect Credentials")
        }
    } catch (error) {
        res.writeHead(500)
        res.end(error.message)
    }
})

// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))

// To sign in, send data with postman in query : username, password
// Save token elsewhere (Note that it expires in 30s)
// To access to /home, send the token in headers, authorization header : "Authorization : bearer TOKEN"