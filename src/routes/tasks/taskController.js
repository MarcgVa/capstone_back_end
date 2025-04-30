require('dotenv').config();
const { prisma, jwt } = require('../../common/common');

const getTasks = async (req, res) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.tasks.findMany({});
  res.send(items);
};

const getMyTasks = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.tasks.findMany({
    where: {
      assignedTo: { equals: req.body.email, }
    },
  });
  res.send(items);
};

const createTask = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  let createdBy = '';
  if (token) {
   createdBy = jwt.verify(token, process.env.JWT_SECRET);
  }else{
   createdBy = process.env.SYS_ADMIN_ID;
  }

  const { title, description, dueDate, assignedTo } = req.body;
  const item = await prisma.tasks.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      assignedTo,
      createdBy,
    },
  });
  res.send(item);
};

const updateTask = async (req, res, next) => {
  const token = req.headers?.authorization.split(' ')[1];
  const updatedBy = jwt.verify(token, process.env.JWT_SECRET);
  const { title, description, dueDate, assignedTo, completed} = req.body;
  const id = req.params.id * 1;

  try {
    const item = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        completed,
        assignedTo,
        updatedBy,
      },
    });

      res.send(item);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const createdBy = jwt.verify(token, process.env.JWT_SECRET);
  const id = req.params.id * 1; //converting the string id to int

  try {
    if (req.body.role.toLowerCase() !== 'admin') {
      await prisma.tasks.delete({
        where: {
          id,
          createdBy,
        },
      });
    } else { 
      await prisma.tasks.delete({
        where: {
          id,
        },
      });
    }

    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  getTasks,
  getMyTasks,
  createTask,
  updateTask,
  deleteTask,
};