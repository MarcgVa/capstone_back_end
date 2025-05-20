require("dotenv").config();
const e = require("express");
const { prisma, bcrypt, jwt } = require("../../common/common");
const { verifyAuthentication, verifyAuthRole } = require("../../common/utils");





/* <---------- Service Plan table functions ----------> */

const getServicePlans = async (req, res, next) => {
  const response = await prisma.servicePlan.findMany({});
  console.log(response);
  res.send(response);
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
          code,
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
  const response = await prisma.services.findMany({});
  res.send(response);
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
      orderBy: {
        scheduledDate:{sort: 'asc', nulls: 'last'},
      }
    });

    res.send(response);
    
  } catch (error) {
    next(error);
    res.send(error);
  }

};

const addService = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  const { servicePlanId, code } = req.body;

  try {
    const response = await prisma.services.create({
      data: {
        accountId: authId,
        servicePlanId: servicePlanId,
        code: code,
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

const updateService = async (req, res, next) => {
  console.log('body', req.body);
  const { id, servicePlanId } = req.body;
  console.log('id', id);
  console.log('servicePlanId', servicePlanId);

  try {
    const response = await prisma.services.update({
      where: {
        id: id,
      },
      data: {
        servicePlanId: servicePlanId,
      }
    });
    res.send(response);

  } catch (error) {
    next(error);
    console.error(error);
  }
}



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

const getServiceWithNoCutDate = async (req, res, next) => { 
  console.log('working');
  try {
    const response = await prisma.services.findMany({
      where: {
        scheduledDate: null,
      },
    });
    console.log('response-outside', response);
    if (response) { 
      console.log('response',response);
      res.send(response);
    }
  } catch (error) {
    console.error(error);
  }
};




module.exports = {
  getServicePlans,
  newServicePlan,
  updateServicePlan,
  deleteServicePlan,
  getService,
  getAllServices,
  getServicesForUser,
  deleteService,
  addService,
  updateService,
  getServiceWithNoCutDate
};
