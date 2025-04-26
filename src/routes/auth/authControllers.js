require("dotenv").config();
const { prisma, bcrypt, jwt, cookies } = require("../../common/common");


const login = async (req, res) => {


  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const match = await bcrypt.compare(password, user?.password);

  if (match) {
    const token = jwt.sign(user.id, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.send({ user, token });
  } else {
    res.send("Try to logon again...");
  }
};

const register = async (req, res) => {
  
  const { email, password, role, firstName, lastName, address, city, state, zip, phone, servicePlanId } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      account: {
        create: {
          firstName,
          lastName,
          address,
          city,
          state,
          zip,
          phone,
          servicePlanId,
        },
      },
    },
  });    


  if (newUser) {
    console.log(newUser);
    const token = jwt.sign(newUser.userId, process.env.JWT_SECRET);
    res.json({ newUser, token });
  } else { 
    res.send("Something didn't work");
  }
}

const getUser = async (req, res, next) => {
  
}



module.exports = { login, register, getUser };