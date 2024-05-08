const express = require("express");
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(cors());

app.get("/api/hello", (req, res) => {
    res.send('you have succesfully entered the Garden backend server');
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log('server started and is listening to port: ', port);
});