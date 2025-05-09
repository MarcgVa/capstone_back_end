require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../../common/common");
const { verifyAuthentication, verifyAuthRole } = require("../../common/utils");


const getServicePlans = async (req, res, next) => {
  
  try {

    const response = await prisma.servicePlan.findMany({});

    if (response) {
      res.send(response);
    } else {
      res.Status(500).send('Something went wrong :(');
    }
    
  } catch (error) {
    next(error);
    res.json(error);
  }
};

const newServicePlan = async (req, res, next) => {

  const { title, description, cost, cycle } = req.body;
  try {
    const response = await prisma.servicePlan.create({
      data: {
        title,
        description,
        cost,
        cycle,
      },
    });
    res.send(response);
  } catch (error) {
    next(error);
    res.json(error);
  }
  
};



module.exports = { getServicePlans, newServicePlan };
