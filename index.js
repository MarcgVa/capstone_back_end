const express = require("express");
const app = express();
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.post('/test', async (req, res) => {
  try {
    const response = await prisma.user.create({
      data: {
        email: 'test2@test.com',
        name: 'Marcus'
      }
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
})