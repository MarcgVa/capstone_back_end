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
          role: { equals: 'USER' }
        },
        include: {
          account: true
        }
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

const getSelf = async (req, res, next) => {
  try {
    const { authId } = verifyAuthentication(req);
    console.log('authId', authId);
    const account = await prisma.user.findFirst({
      where: {
        id: { equals: authId, }
      },
      include: {
        account: true,
      }
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
  const { authId } = verifyAuthentication(req);
  const isAuthorized = await verifyAuthRole(authId);
  const { email, role, account } = req.body;
  const { firstName, lastName, address, city, state, zip, phone } = account;
   
  const { id } = req.params;
  try {
    if (authId === id || isAuthorized) { 
      const user = await prisma.account.update({
        where: {
          accountId: { equals: id },
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


module.exports = { getUsers, getSelf, updateUser, deleteUser };
