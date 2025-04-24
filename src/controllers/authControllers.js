require("dotenv").config();
const { prisma, bcrypt, jwt } = require("../common/common");


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
  
  const { email, password, role } = req.body
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });    

  if (newUser) {
    console.log(newUser);
    const token = jwt.sign(newUser.id,process.env.JWT_SECRET);
    res.json({ newUser, token });
  } else { 
    res.send("Something didn't work");
  }
}




module.exports = { login, register };