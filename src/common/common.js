const bcrypt = require("bcrypt");
const { PrismaClient } = require("../../generated/prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");



module.exports = {bcrypt, prisma, jwt};
