const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


const authRoutes = require("../src/routes/auth/authRoutes");
const taskRoutes = require("../src/routes/tasks/taskRoutes");
const accountRoutes = require("../src/routes/accounts/accountRoutes");
const scheduleRoutes = require("../src/routes/schedule/scheduleRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/clients", accountRoutes);
app.use("/api/ops", scheduleRoutes);


module.exports = app;