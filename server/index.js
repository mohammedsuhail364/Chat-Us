import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import contactsRoutes from './routes/contactRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/messageRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
dotenv.config();
const app=express();
const port=process.env.PORT || 3001;
const databaseURL=process.env.DATABASE;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE" ],
    credentials:true,
})) 

app.use('/uploads/profiles',express.static('uploads/profiles'))
app.use('/uploads/files',express.static('uploads/files'))
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/contacts',contactsRoutes)
app.use('/api/messages',messagesRoutes)
app.use('/api/channel',channelRoutes)
const server=app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);

})
setupSocket(server);
mongoose
    .connect('mongodb+srv://chatUs:suhail364@cluster0.jl7nkbn.mongodb.net/chatApp?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log('Db connection successful'))
    .catch((err)=>console.log(err));
