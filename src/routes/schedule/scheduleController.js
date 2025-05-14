require("dotenv").config();
const { prisma, jwt } = require("../../common/common");
const { verifyAuthentication, verifyAuthRole } = require("../../common/utils");

const date = new Date();
const TODAY = date;

const getAllSchedules = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);

  if (isAuthorized) {
    try {
      const items = await prisma.services.findMany({
        where: {
          scheduledDate: { equals: TODAY },
        },
        include: {
          account: true,
        }
      });
      res.send(items);
    } catch (error) {
      next(error);
    }
  } else { 
    res.sendStatus(403);
  }
};

const getSchedule = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  try {
    const items = await prisma.services.findMany({
      where: {
        scheduledDate: { equals: TODAY },
      },
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
};

const getMySchedule = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  const user = await prisma.user.findFirst({
    where: { id: { equals: authId } },
    
  });

  console.log(user.email);
  
  try {
    const items = await prisma.services.findMany({
      where: {
        AND: [
          {
            scheduledDate: { equals: TODAY },
          },
          {
            scheduledTech: { equals: user.email },
          },
        ],
      },
      include: {
        account: true,
      },
    });
    res.send(items);

  } catch (error) {
    next(error);
  }
}


module.exports = { getAllSchedules, getMySchedule };