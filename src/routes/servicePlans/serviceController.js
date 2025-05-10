require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../../common/common");
const { verifyAuthentication, verifyAuthRole } = require("../../common/utils");





/* <---------- Service table functions ----------> */

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
  const { authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  if (isAuthorized) {
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
  } else { 
    res.sendStatus(403);
  }
};

const updateServicePlan = async (req, res, next) => {
  const { token, authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  const { title, description, cost, cycle } = req.body;
  if(isAuthorized){
    try {
      const response = await prisma.servicePlan.update({
        where: {
        id, 
        },
        data: {
          title,
          description,
          cost,
          cycle,
        },
      });
    } catch (error) {
      next(error);
      res.json(error);
    }
  } else {
    res.sendStatus(403);  
  }
};

const deleteServicePlan = async (req, res, next) => {
  const {  authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  const { id } = req.params;
  console.log(id);
  console.log(isAuthorized);
  if (isAuthorized) {
    try {
    
      const response = await prisma.servicePlan.delete({
        where: {
          servicePlanId: id,
        }
      });
    
      res.sendStatus(204);

    } catch (error) {
      next(error);
      res.json(error);
    }
  } else { 
    res.sendStatus(403)
  }
};



/* <---------- Service table functions ----------> */

const getService = async (req, res, next) => {
  const { token, authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);

  const { id } = req.params;
  try {
    const response = await prisma.services.findMany({
      where: {
        id: {equals: id},
      },
      include: {
        servicePlan: true,
      },
    });

    res.send(response);
  } catch (error) {
    next(error);
    res.send(error);
  }
};

const getAllServices = async (req, res, next) => {
  
};

const getServicesForUser = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  try {
    
    const response = await prisma.services.findMany({
      where: {
        accountId: {equals: authId},
      },
      include: {
        servicePlan: true,
      },
    });

    res.send(response);
    
  } catch (error) {
    next(error);
    res.send(error);
  }

};

const addService = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  const { servicePlanId } = req.body;

  try {
    const response = await prisma.services.create({
      data: {
        accountId: authId,
        servicePlanId: servicePlanId,
      },
    });

    if (response) {
      res.send(response);
    } else { 
      res.Status(500).send('Something went wrong :(');
    }
  } catch (error) {
    next(error)
    res.send(error);
  }
};

const deleteService = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  const { id } = req.params;
  try {
    const response = await prisma.services.delete({
      where: {
        AND: [
          {
          id: {equals: id},
          },
          {
            accountId: {equals: authId},
          }
        ],
      },
    });
    
    res.sendStatus(204);

  } catch (error) {
    next(error);
    res.Status(500).send('Something went wrong on the server :(');
  }
};






module.exports = { getServicePlans, newServicePlan, updateServicePlan, deleteServicePlan, getService, getAllServices, getServicesForUser, deleteService, addService };
