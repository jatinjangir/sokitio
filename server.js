
const express = require('express')
const path = require('path')
const socketio = require('../lib/socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use('/', express.static(path.join(__dirname, 'frontend')))

io.on('connection', (socket) => {
    console.log("New socket formed from " + socket.id )
    socket.emit('connected')
    socket.on('send_msg', (data) => {
        io.emit('recv_msg', data)
    })
})

server.listen(2345, () => console.log('Website open on http://localhost:2345'))


