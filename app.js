const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


const authRoutes = require("./src/routes/auth/authRoutes");
const todoRoutes = require("./src/routes/todo/todoRoutes");


app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);



module.exports = app;