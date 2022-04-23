const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');

const PORT =  process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build/")));

//serve the react components
app.get('/*',(req,res) => {
	console.log(`+9999`, path.join(__dirname, "..", "build", "index.html"))
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  })

const server = http.createServer(app);

const io = new Server(server, {
})

io.on("connection", (socket) => {
    console.log("socket user id: ", socket.id); //each user that connect to the server gets an id

    socket.on("join_room", (data) => {
        if (io.sockets.adapter.rooms.has(data)) {
            if(io.sockets.adapter.rooms.get(data).size < 2) {
                socket.join(data);
                console.log(`User with ID: ${socket.id} joined room: ${data}`);
                console.log('clients in room ', io.sockets.adapter.rooms.get(data).size);
                io.to(data).emit("receive_number", io.sockets.adapter.rooms.get(data).size);
            }
            else{
                console.log('connection rejected - max 2 clients');
            }
        }
        else{
            socket.join(data);
            console.log(`User with ID: ${socket.id} joined room: ${data}`);
            console.log('clients in room ', io.sockets.adapter.rooms.get(data).size)
            io.to(data).emit("receive_number", io.sockets.adapter.rooms.get(data).size);
        }
    })
    
    socket.on("send_drawing", (data) => {
        io.to(data.room).emit("receive_drawing", data);
        
    })
    
    socket.on("send_guess_result", (data) => {
        io.to(data.room).emit("receive_guess_result", data);
    })

    // socket.on("request_player_number", (data) => {
    //   io.to(data.room).emit("receive_player_number", io.sockets.adapter.rooms.get(data)?.size);
    // })

    socket.on("disconnect", () => { console.log("user disconnected ", socket.id); });
})

server.listen(PORT, () => { console.log(`server running on http://localhost:${PORT}`) })