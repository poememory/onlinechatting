const express =require("express");
const app =express();
const port=3000;
const cors = require('cors');
const user=require("./router/user")
const http = require('http');
const setupWebSocket = require('./utils/websocket');

const httpserver = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.use("/api/user",user);
setupWebSocket();

app.listen(port,()=>{
    console.log(`Express server listening at http://localhost:${port}`);
})