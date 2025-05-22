require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../../common/common");
const { verifyAuthentication,verifyAuthRole } = require("../../common/utils");



const getUsers = async (req, res, next) => {
  const { token, authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  if (token && isAuthorized) {
    try {
      const clients = await prisma.user.findMany({
        where: {
          AND: [
            {
              role: { not: 'DISABLED' },
            },
            {
              role: { not: 'ADMIN'},
            },
          ],
        },
        include: {
          account: {
            include: {
              Services: {
                include: {
                  servicePlan: true,
                },
              },
            },
          },
        },
        omit: {
          password: true,
        },
        orderBy: [{ role: 'desc' }],
      });
      
      if (clients) {
        res.send(clients);
      }

    } catch (error) {
      next(error);
    }
  } else {
    res.send('Not authorized,verifyRole to make this request.')
  
  }
};

const getUser = async (req, res, next) => {
  const { token, authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  const { id } = req.params;
  if (authId === id || token && isAuthorized) {
    try {
      const client = await prisma.user.findFirst({
        where: {
          id: { equals: id },
        },
        include: {
          account: {
            include: {
              Services: {
                include: {
                  servicePlan: true,
                },
              },
            },
          },
        },
        omit: {
          password: true,
        },
      });

      if (client) {
        res.send(client);
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.send("Not authorized,verifyRole to make this request.");
  }
};

const getSelf = async (req, res, next) => {
  try {
    const { authId } = verifyAuthentication(req);
    const account = await prisma.user.findFirst({
      where: {
        id: { equals: authId },
      },
      include: {
        account: {
          include: {
            Services: {
              include: {
                servicePlan: true,
              },
            },
          },
        },
      },
      omit: {
        password: true,
      },
    });

    if (account) {
      res.send(account);
    } else {
      res.Status(500).send("Something went wrong...");
    }    
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  const { email, role, firstName, lastName, address, city, state, zip, phone } = req.body;
  try {
    if (authId === id || isAuthorized) {
      const response = await prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
          role,
          account: {
            update: {
              firstName,
              lastName,
              address,
              city,
              state,
              zip,
              phone,
            },
          },
        },
      });
      
      if (response) {
        res.send(response);
      } else {
        res.Status(500).send("Something went wrong :(");
      }
    } else { 
      res.sendStatus(403);
    }
    
  } catch (error) {
    next(error)
  }
};

const deleteUser = async (req, res, next) => {
  const { token, authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  const { id } = req.params;
  try {
    if (id === authId || isAuthorized) { 
      const response = await prisma.user.delete({
        where: {
          id,
        },
        include: {
          account: true,
          todos: true,
        }
      });
    }
    res.Status(204);
  } catch (error) {
    next(error)
  }
};

const disableUser = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  const { id } = req.params;
  try {
    if (isAuthorized) {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          role: "DISABLED",
        }
      });
    } else {
      res.sendStatus(403);
    }    
  } catch (error) {
    next(error);
  }
}


module.exports = { getUsers, getUser, getSelf, updateUser, deleteUser, disableUser };
