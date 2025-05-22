require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../../common/common");
const { verifyAuthentication, verifyAuthRole } = require("../../common/utils");


const getListOfInvoicesForUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await prisma.billing.findMany({
      where: {
        billToId: { equals: id },
      },
      orderBy: {
        startDate: 'desc'
      },
    });
  
    if (response) {
      console.log(response);
      res.send(response);
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};


module.exports = {
  getListOfInvoicesForUser,
};