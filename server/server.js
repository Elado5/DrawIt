const PORT = 3001;
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log("socket user id: ", socket.id); //each user that connect to the server gets an id

    socket.on("join_room", (data) => {
        if (io.sockets.adapter.rooms.has(data)) {
            if(io.sockets.adapter.rooms.get(data).size < 2) {
                socket.join(data);
                console.log(`User with ID: ${socket.id} joined room: ${data}`);
                console.log('clients in room ', io.sockets.adapter.rooms.get(data).size);
            }
            else{
                console.log('connection rejected - max 2 clients');
            }
        }
        else{
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
            console.log('clients in room ', io.sockets.adapter.rooms.get(data).size)
        }
    }),
    
    socket.on("send_drawing", (data) => {
        //socket.broadcast.emit("receive_drawing", data);
        console.log('data.room', data.room)
        io.to(data.room).emit("receive_drawing", data);
    })
    
    // socket.on("request_player_number", (data) => {
    //   io.to(data.room).emit("receive_player_number", io.sockets.adapter.rooms.get(data)?.size);
    // })

    socket.on("disconnect", () => { console.log("user disconnected ", socket.id); });
})

server.listen(PORT, () => { console.log(`server running on http://localhost:${PORT}`) })