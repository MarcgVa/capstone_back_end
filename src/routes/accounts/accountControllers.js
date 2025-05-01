require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../../common/common");

const getUsers = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const role = window.sessionStorage.getItem('role').toLowerCase();

  if (token && (role === 'manager' || role === 'admin')) {
    try {
      const clients = prisma.account.findMany({
        where: {
          role: { equals: 'USER' }
        },
      });
      
      if (clients) {
        
      }
    } catch (error) {
      
    }
  } else { 
    res.send('Not authorized to make this request.')
  }
};

const getUser = async (req, res, next) => {

};

const getSelf = async (req, res, next) => {
  
};

const updateUser = async (req, res, next) => {
  
};

const deleteUser = async (req, res, next) => {
  
}

module.exports = { getUser, getUsers, getSelf, updateUser, deleteUser };
