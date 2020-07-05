const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const socketio = require('socket.io')
const expressSanitizer = require('express-sanitizer');

const app = express()
const server = http.createServer(app)
const io = socketio(server)

let users = []
let messages = []
let index = 0

const port = 3030

io.on('connection', socket => {
  // socket.emit('message', 'Welcome to Memo Chat')

  socket.emit('loggedIn', {
    users: users.map(s => s.username),
    messages: messages
  })

  socket.on('newUser', username => {
    console.log(`${username} has joined`)
    // socket.username = username
    // socket.id = socket.id
    users.push({
      id: socket.id,
      username: username
    })

    let len = users.length;
    len--;

    io.emit('userOnline', users, users[len].id)
  })

  socket.on('msg', data => {

    let message = {
      msg: data.msg,
      name: data.name
    }

    messages.push(message)

    console.log(data)

    socket.broadcast.to(data.toid).emit('sendMsg', message)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.username} has left`)

    for(let i=0; i < users.length; i++){
                    
        if(users[i].id === socket.id){
            users.splice(i,1); 
        }
    }

    io.emit('exit', users); 
  })

  // socket.broadcast.emit('message', 'A new user has joined the chat')

  // socket.on('disconnect', () => {
  //   io.emit('message', 'A user has left the chat')
  // })

})


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected'))

const authRoute = require('./routes/auth')

app.use(cors())
app.use(expressSanitizer())
app.use(express.json())
app.use('/api/auth', authRoute)

server.listen(port, () => console.log(`Server running on: http://localhost:${port}`))