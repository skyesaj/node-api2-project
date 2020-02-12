// const express = require("express");
// const Post = require("./Routes/Post");

// const server = express();
// const router = express.Router();
// server.use(express.json());

// url

// server.use("/api/post", Post);

// server.get("/", (req, res) => {
//   res.send(`
//    <h1> Post API </h1>
//    `);
// });
const server = require("./api/server.js");

server.listen(5000, () => {
  console.log("\n *** Server Running on http://localhost:5000 ***\n");
});
