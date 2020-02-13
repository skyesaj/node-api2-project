const express = require("express");
const Post = require("../routes/Posts.js");

const server = express();

server.use(express.json());
server.use("/api/posts", Post);

server.get("/", (req, res) => {
  res.send(`
   Post API
   `);
});

module.exports = server;
