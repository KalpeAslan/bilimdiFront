const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 4040

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'dist', 'index.html'))
})
console.log('OQY running at PORT: ' + PORT)
app.listen(PORT)
