require('dotenv').config();
const { prisma, jwt } = require("./common");



const verifyAuthentication = (req) => {
  const token = req.headers?.authorization?.split(" ")[1];
  const authId = jwt.verify(token, process.env.JWT_SECRET).id;
  return { token, authId };
};


//User to verify the requester is a manager or admin
const verifyAuthRole = async (id) => {
  const authAccount = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  const role = authAccount.role.toLowerCase();
  if (role === "manager" || role === "admin") {
    return true;
  } else {
    return false;
  }
};

const verifyOpsRole = async (id) => {
  const authAccount = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  const role = authAccount.role.toLowerCase();
  if (role !== 'user') {
    return true;
  } else {
    return false;
  }
};



module.exports = { verifyAuthentication, verifyAuthRole, verifyOpsRole };

