const cron = require('node-cron');
require("dotenv").config();
const { prisma } = require("../common/common");


//Schedule a daily task to be run on server .
cron.schedule('59 23 * * *', function () {

  const TODAY = new Date();
  let 
  const getUsersToUpdate = async (date) => {

    const users = await prisma.account.findMany({
      where: {
        cutDate: { equals: date },
      },
    });
    
  }



 });