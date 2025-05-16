require("dotenv").config();
const { prisma, jwt } = require("../../common/common");
const { verifyAuthentication, verifyAuthRole } = require("../../common/utils");

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

const getSchedule = async (req, res, next) => {
  const today = new Date();
  const { authId } = verifyAuthentication(req);
  try {
    const items = await prisma.services.findMany({
      where: {
        scheduledDate: { equals: today },
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

module.exports = { getAllSchedules, getMySchedule };
