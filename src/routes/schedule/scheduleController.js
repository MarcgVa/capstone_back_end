require("dotenv").config();
const { prisma, jwt } = require("../../common/common");
const { verifyAuthentication, verifyAuthRole, verifyOpsRole } = require("../../common/utils");

const getAllSchedules = async (req, res, next) => {
  const today = new Date();
  const { authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);

  if (isAuthorized) {
    try {
      const items = await prisma.services.findMany({
        where: {
          scheduledDate: { equals: today },
        },
        include: {
          account: true,
        },
      });
      res.send(items);
    } catch (error) {
      next(error);
    }
  } else {
    res.sendStatus(403);
  }
};

const getTodaySchedule = async (req, res, next) => {
  const today = new Date();
  const { authId } = verifyAuthentication(req);
  // Get clients and services for today.
  try {
    const items = await prisma.account.findMany({
      where: {
        Services: {
          some: {
                 scheduledDate: { equals: today },
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        Services: {
          select: {
            code: true,
          },
        },
      },
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
};

const getMySchedule = async (req, res, next) => {
  const today = new Date();
  const { authId } = verifyAuthentication(req);


  // Get tech email address
  const user = await prisma.user.findFirst({
    where: { id: { equals: authId } },
  });

  // Get clients and services for today.
  try {
    const items = await prisma.account.findMany({
      where: {
        Services: {
          some: {
            AND: [
              {
                scheduledDate: { equals: today },
              },
              {
                scheduledTech: { equals: user.email },
              },
            ],
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        city: true,
        state: true,
        zip: true,
        phone: true,
        Services: {
          select: {
            code: true,
          },
        },
      },
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
};

const getMaintenanceSchedule = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  const isAuthorized = verifyOpsRole(authId);
  
  if (isAuthorized) {
    try {
      const response = await prisma.maintenance.findMany({});
      
      if (response) { 
        res.send(response);
      }
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  } else { 
    res.sendStatus(403);
  }
  
}

module.exports = { getAllSchedules, getMySchedule, getMaintenanceSchedule, getTodaySchedule };
