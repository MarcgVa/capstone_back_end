require("dotenv").config();
const { token } = require("morgan");
const { prisma, bcrypt, jwt } = require("../../common/common");


const checkRole = async (id) => {
  const authAccount = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  const role = authAccount.role.toLowerCase()
  if (role === 'manager' || role === 'admin') {
    return true;
  } else { 
    return false;
  }
};


const getUsers = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const authId = jwt.verify(token, process.env.JWT_SECRET);
  const isAuthorized = checkRole(authId);

  if (token && isAuthorized) {
    try {
      const clients = await prisma.user.findMany({
        where: {
          role: { equals: 'USER' }
        },
      });
      
      if (clients) {
        res.send(clients);
      }
    } catch (error) {
      next(error);
    }
  } else { 
    res.send('Not authorized to make this request.')
  }
};

const getUser = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const authId = jwt.verify(token, process.env.JWT_SECRET);
  const isAuthorized = checkRole(authId);
  const { id } = req.params;

  if (id === authId || isAuthorized) {
    try {
      const client = await prisma.account.findFirst({
        where: {
          accountId: {equals: id},
        },
      });

      if (client) {
        res.send(client);
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.send("Not authorized to make this request.");
  }
};

const getSelf = async (req, res, next) => {
  
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const id = jwt.verify(token, process.env.JWT_SECRET);

    const account = await prisma.account.findFirst({
      where: {
        accountId: { equals: id, }
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
  
};

const deleteUser = async (req, res, next) => {
  
}

module.exports = { getUser, getUsers, getSelf, updateUser, deleteUser };
