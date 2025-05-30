require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
// if (process.env.ENV === 'dev') {
//   app.use(cors({ origin: "http://localhost:3001" }));
// } else { 
//   app.use(cors({ origin: "https://grupelawncare.netlify.app" }));
// }
const authRoutes = require("../src/routes/auth/authRoutes");
const taskRoutes = require("../src/routes/tasks/taskRoutes");
const accountRoutes = require("../src/routes/accounts/accountRoutes");
const scheduleRoutes = require("../src/routes/schedule/scheduleRoutes");
const serviceRoutes = require("../src/routes/servicePlans/serviceRoutes");
const billRoutes = require("../src/routes/billing/billRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/clients", accountRoutes);
app.use("/api/ops", scheduleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/invoice", billRoutes);

module.exports = app;
