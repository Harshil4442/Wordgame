import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import axios from 'axios';
import random from 'random';
import { generate, count } from "random-words";
import 'dotenv/config';
const app = express();


// middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// dependency for real time chat application
import http from 'http';
import { Server } from 'socket.io';
// code for real time chat application
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});


//import conn and coll
import "./conn.js";
import rdata from "./coll.js";















app.get('/', (req, res) => {
    res.send('Okay');
});


app.post('/data', async (req, res) => {

    const { name, roomId } = req.body;

    const existingroom = await rdata.findOne({ roomid: roomId });
    const existingnameroom = await rdata.findOne({ $and: [{ roomid: roomId }, { 'username': name }] });
    if (existingnameroom) {
        try {
            return res.status(200).json({ message: 'Data received and updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    }
    else if (existingroom) {
        existingroom.username.push(name);
        try {
            await existingroom.save();
            return res.status(200).json({ message: 'Data received and updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    }
    else {
        const newRoom = new rdata({
            roomid: roomId,
            username: [name],
        });
        try {
            await newRoom.save();
            return res.status(200).json({ message: 'Data received and saved successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    }
});


let usersocket = {};
let usernames = {};
let mapping = {};
let roomdrawing = {};
let usernamepoints = {};


io.on('connection', (socket) => {

    socket.on('Update_users', ({ id, username }) => {
        async function tempforasync() {
            socket.join(id);
            socket.username = username;

            socket.broadcast.to(id).emit('New user joined', username);

            if (usersocket[id] == undefined) {
                try {
                    roomdrawing[id] = [];
                    usersocket[id] = [];
                    usernames[id] = [];
                    usernamepoints[id] = [];
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                io.to(socket.id).emit('Inivisible Button for new user');
            }

            usersocket[id].push(socket.id);
            usernames[id].push(username);
            mapping[socket.id] = id;
            usernamepoints[id].push({ username, value: 0 });

            if (roomdrawing[id]) {
                const lines = roomdrawing[id];
                io.to(socket.id).emit('Updated drawing for new user', lines);
            }

            io.to(id).emit('User list for frontend', usernames[id]);
            io.to(id).emit('Usernamepoints initialize',usernamepoints[id]);

        }
        tempforasync();
    });

    socket.on('Updated drawing for backend', (lines) => {
        roomdrawing[mapping[socket.id]] = lines;
        io.to(mapping[socket.id]).emit("Updated drawing for users", lines);
    })
    socket.on('clear', (space) => {
        io.to(mapping[socket.id]).emit('clear frontend');
    })

    socket.on('Restart all', (space) => {
        io.to(mapping[socket.id]).emit('Clear frontend for word component', space);
        io.to(mapping[socket.id]).emit('Restart points and index', space);
    })

    socket.on('chat message for backend', ({ username, message }) => {
        io.to(mapping[socket.id]).emit('chat for frontend', { username, message });
    })
    socket.on('Update timer', (timerr) => {
        io.to(mapping[socket.id]).emit('Updated timer for frontend', timerr);
    });
    socket.on('Selected word', (word) => {
        var space='';
        io.to(mapping[socket.id]).emit('Hidden word for frontend', word);
        io.to(socket.id).emit('Chat send disable',space);
    });
    socket.on('Generate words for a random user', (space) => {

        const ind = 0;
        const randomUsername = usernames[mapping[socket.id]][ind];
        const randomUserSocketId = usersocket[mapping[socket.id]][ind];
        const generatedWords = generate(3);
        io.to(mapping[socket.id]).emit('Inivisible Button', space);
        io.to(mapping[socket.id]).emit('Who is drawing', randomUsername)
        io.to(randomUserSocketId).emit('Generated words for user frontend', generatedWords);


        //pop frnt and push last
        const poppedUsername = usernames[mapping[socket.id]].shift();
        usernames[mapping[socket.id]].push(poppedUsername);
        const poppedUsersocketid = usersocket[mapping[socket.id]].shift();
        usersocket[mapping[socket.id]].push(poppedUsersocketid);

    });

    socket.on('Points up', ({ username, indforpoints }) => {
        const roomId = mapping[socket.id];
        const userIndex = usernamepoints[roomId].findIndex(userObj => userObj.username === username);
        if (indforpoints>=1 && userIndex!==-1) {
            usernamepoints[roomId][userIndex].value += indforpoints * 10;
            // console.log(usernamepoints);
            io.to(roomId).emit('Standings', usernamepoints[roomId]);
        }
    });




    socket.on('disconnect', async () => {
        // console.log(user disconnected ${socket.id});
        socket.broadcast.to(mapping[socket.id]).emit('User left the room', socket.username);
        const xid = mapping[socket.id];
        const xdrw = roomdrawing[mapping[socket.id]];
        if (usersocket[mapping[socket.id]]) {
            usersocket[mapping[socket.id]] = usersocket[mapping[socket.id]].filter(item => item !== socket.id);
        }
        if (usernames[mapping[socket.id]]) {
            usernames[mapping[socket.id]] = usernames[mapping[socket.id]].filter(item => item !== socket.username);
            io.to(mapping[socket.id]).emit('User list for frontend', usernames[mapping[socket.id]]);
        }
        delete mapping[socket.id];
        if (Object.keys(mapping).length === 0) {
            // savecode(xid, xcode);
            delete roomdrawing[mapping[socket.id]];
            // delete roomlanguage[mapping[socket.id]];
            delete usersocket[mapping[socket.id]];
        }
    });
});











httpServer.listen(process.env.PORT, () => {
    console.log('listening on *:3000');
});
