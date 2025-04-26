const router = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("../../generated/prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const Cookies = require('universal-cookie');
const cookies = new Cookies(null, {path:'/'});


module.exports = { router, bcrypt, prisma, jwt, cookies };
