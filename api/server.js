const express = require("express");
const Post = require("../routes/Post.js");

const server = express();

server.use(express.json());
server.use("/api/routes", Post);

server.get("/", (req, res) => {
  res.send(`
   Post API
   `);
});

module.exports = server;
