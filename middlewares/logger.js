const fs =  require("fs");
const path = require("path");

const myLogger = function (req, res, next) {
    console.log(`A new request with method ${req.method} at ${req.url} received at ${Date.now()}`);
    fs.appendFileSync(path.join(__dirname.replace("\\middlewares", ""), "storage", "logs.txt"), `A new request with method ${req.method} at ${req.url} received at ${Date.now()}\n`)
    next();
}

module.exports = myLogger