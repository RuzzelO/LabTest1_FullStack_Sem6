const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const { disconnect } = require('process')
const PORT = 8093
const mongoose = require('mongoose')



mongoose.connect('mongodb+srv://RuzzelO:pieguy123@cluster0.h6msz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



const io = require('socket.io')(http)

app.use(cors())

users = []


app.get("/",(req,res) =>{
    res.send("Chat Server Running....")
})

app.get("/index.html",(req,res) =>{
    res.sendFile(__dirname +"/index.html")
})

app.get('/login.html',function(req,res) {
    res.sendFile(__dirname +'/login.html')
})

app.get('/signup.html',function(req,res) {
    res.sendFile(__dirname +'/signup.html')
})


var roomName = 'news'


io.on('connection',(socket) =>{
    console.log('Connected')
    socket.emit('welcome', 'Welcome to Chat Room: ' + socket.id)

    socket.on('message', (data) =>{
        console.log(data)

        console.log(`Room Name: ${roomName}`)
       io.to(roomName).emit('newMessage', data)
    })

    socket.on('newUser', (name)=>{
        console.log(name)

        users.push(name)
        console.log(users)
    })

    
    socket.on('joinroom', (room) => {
        socket.join(room)
        roomName = room
    })

    socket.on('disconnect', () =>{
        console.log(`${socket.id} disconnected`)
    })


})


http.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})