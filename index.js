// ? Level 1 : Basic Server

const express = require('express')

// Init express

const app = express()

// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))
