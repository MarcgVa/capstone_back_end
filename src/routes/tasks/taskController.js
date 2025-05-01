require('dotenv').config();
const { prisma, jwt } = require('../../common/common');

const getTasks = async (req, res) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.tasks.findMany({
    where: {
      userId: { equals: id, }
    },
  });
  res.send(items);
};

const getTask = async (req, res) => {
  const token = req.headers?.authorization.split(" ")[1];
  const { id } = req.params;
  const item = await prisma.tasks.findMany({
    where: {
      id,
    },
  });
  res.send(item);
};

const getMyTasks = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.tasks.findMany({
    where: {
      assignee: { equals: req.body.email, }
    },
  });
  res.send(items);
};

const createTask = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  let createdBy = '';
  if (token) {
    createdBy = jwt.verify(token, process.env.JWT_SECRET);
  } else {
    createdBy = process.env.SYS_ADMIN_ID;
  }
  const { title, description, dueDate, assignedTo } = req.body;
  try {
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
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const token = req.headers?.authorization.split(' ')[1];
  const updatedBy = jwt.verify(token, process.env.JWT_SECRET);
  const { title, description, dueDate, assignedTo } = req.body;
  try {
    const item = await prisma.tasks.update({
      where: {
        id: req.params.itemId,
      },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
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
  const id = req.params.id * 1;

  try {
    await prisma.tasks.delete({
      where: {
        id,
        createdBy,
      },
    });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
};


module.exports = { getTasks, getTask, getMyTasks, createTask, updateTask, deleteTask };
