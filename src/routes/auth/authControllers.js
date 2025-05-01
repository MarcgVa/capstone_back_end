require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../../common/common");



const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const match = await bcrypt.compare(password, user?.password);

  if (match) {
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    res.send({ user, token });
  } else {
    res.send("Try to logon again...");
  }
};

const register = async (req, res) => {
  const { email, password, role, firstName, lastName, address, city, state, zip, phone } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  zipcode = zip * 1;
  const user = await prisma.user.create({
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
          zip: zipcode,
          phone,
        },
      },
    },
  });    


  if (user) {
    console.log(user);
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    console.log('token after registration',token);
    res.json({user, token });
  } else { 
    res.send("Something didn't work");
  }
}

const getUser = async (req, res, next) => {
  
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  res.send(user);
}



module.exports = { login, register, getUser };