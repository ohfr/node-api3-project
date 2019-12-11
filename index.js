const express = require("express");

const server = require("./server");
const logger = require("./Middleware/logger");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.use(logger());

server.use(express.json());

server.use("/users", userRouter);

server.use("/posts", postRouter);

server.use((req,res) => {
    res.status(404).json({message: "Page Not Found"})
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: "An Internal Error Occurred"})
})

server.listen(4000, () => {
    console.log(`\n **** Server running on port 4000 **** \n`);
})