// server.js
require('dotenv').config()
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

//Config Server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

//Supabase SQL
const { createClient } = require('@supabase/supabase-js');

// Replace these values with your actual Supabase project URL and API key
const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;


const supabase = createClient(supabaseUrl, supabaseKey);


app.get('/hello', (req, res) => {
  res.send("Hello")
});


async function fetchDataFromTable() {
  try {
    
    const { data, error } = await supabase
      .from('UserPublic')
      .select(`username, id`); // Fetch all columns
      

    if (error) {
      console.error('Error fetching data:', error.message);
      return;
    }

    console.log('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}
async function insertData(){
  try{
    const { error } = await supabase
    .from('UserPublic')
    .insert({userId: 2, username:"tylermoney", "subscriberCount": 1}); // Fetch all columns

    if(error){
      console.error("Error adding the data" + error.message)
    }

  }
  catch(error){
    console.error("Error fetching the data", error.message)

  }
}
// USER PRIVATE

// userID
// email
// phonenumber
// password
// firstname
// lastname


// USER PUBLIC

// userId
// username
// subscriberCount

insertData()

fetchDataFromTable()





async function startServer() {
  try {
    // await client.connect();
    console.log('Connected to MongoDB');

    // Routes
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });

    // Socket.io logic
    io.on('connection', (socket) => {
      console.log('A user connected');

      // Handle joining chatrooms
      socket.on('join', (room, user) => {
        socket.join(room);
        console.log(`${user} joined room: ${room}`);
      });

      // Handle chat messages
      socket.on('chat message', (msg, room) => {
        io.to(room).emit('chat message', msg); // Broadcast message to everyone in the room
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
}