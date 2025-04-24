const express = require("express");
const app = express();
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
