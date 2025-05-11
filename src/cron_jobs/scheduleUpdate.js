const cron = require('node-cron');
require("dotenv").config();
const { prisma } = require("../common/common");


//Schedule a daily task to be run on server .
cron.schedule('* * * * *', function () {

  console.log("STARTED :: Cut Schedule Update");
  const cutDate = new Date();
//  const newCutDate = new Date(new Date().setDate(new Date().getDate() + 7));
  
  console.log('cutDate', cutDate);

  

  const updateUsersCutDate = async () => {
    try {
      const accountsToUpdate = await prisma.services.updateMany({
        where: {
          scheduledDate: {equals: cutDate},
        },
        include:{
          servicePlan: {
              select
            }
        },
        data: [
          scheduledDate: {equals: new Date(new Date().setDate(new Date().getDate() + servicePlan.cycle))}
        ]
      });
      
      console.log(accountsToUpdate);
    } catch (error) {
      console.error(error);      
    }
  };


  updateUsersCutDate();

  console.log('Completed::Cut Schedule Update');
 });