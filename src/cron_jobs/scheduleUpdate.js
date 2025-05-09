const cron = require('node-cron');
require("dotenv").config();
const { prisma } = require("../common/common");


//Schedule a daily task to be run on server .
cron.schedule('00 23 * *', function () {

  console.log("STARTED :: Cut Schedule Update");
  const cutDate = new Date();
  const newCutDate = new Date(new Date().setDate(new Date().getDate() + 7));
  
  console.log('cutDate', cutDate);
  console.log("newCutDate", newCutDate);
  

  const updateUsersCutDate = async () => {
    try {
      const response = await prisma.account.updateMany({
        where: {
          cutDate: { equals: cutDate },
        },
        data: {
          cutDate: newCutDate,
        },
      });
      
    } catch (error) {
      console.error(error);      
    }
  };


  updateUsersCutDate();

  console.log('Completed::Cut Schedule Update');
 });