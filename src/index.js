require ('../src/DB/models/user')
const port = process.env.PORT||3000;
const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
var cors = require('cors')
const app = express();
const server = http.createServer(app)
const io = socketio(server,{
    cors: {
        origin: port,
        methods: ["GET", "POST"]
    }
});
app.io = io;
require("./DB/Mongoose");
app.use(express.json())
app.use(cors())




let count = 0
console.log(count)
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        io.emit('countUpdated', count)
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
    console.log(`Example app listening at http://localhost:${port}`)
})
