require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socket-server')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})


// Routes
app.use('/api', require('./routers/authentication-router'))
app.use('/api', require('./routers/users-router'))
app.use('/api', require('./routers/posts-router'))
app.use('/api', require('./routers/comments-router'))
app.use('/api', require('./routers/notifications-router'))
app.use('/api', require('./routers/messages-router'))


const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/merny'
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5555
http.listen(port, () => {
    console.log('Server is running on port', port)
})