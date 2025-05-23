require('dotenv').config();
const { prisma, jwt } = require('../../common/common');
const { verifyAuthentication, verifyAuthRole } = require("../../common/utils");

const getTasks = async (req, res, next) => {
  const { authId } = verifyAuthentication(req);
  
  try {
    const items = await prisma.tasks.findMany({
      orderBy: {
        title: 'asc',
      },
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  const { id } = req.params;
  try {     
    const item = await prisma.tasks.findMany({
      where: {
        id: {equals: (id*1)},
      },
    });
    res.send(item);
  } catch (error) {
    next(error);
  }
};

const getNewConsults = async (req, res, next) => {
  try {     
    const response = await prisma.tasks.findMany({
      where: {
        title: { equals: "NEW CONSULT REQUEST" },
      },
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const getMyTasks = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const user = await prisma.user.findFirst({
    where: { id: { equals: id } },
    
  });
  const items = await prisma.tasks.findMany({
    where: {
      OR: [

        { assignedTo: { equals: user.email } },

        { createdBy: { equals: id } },

      ],
    },
    orderBy: {
      title: 'asc',
    },
  });
  res.Status(200).send(items);
};

const createTask = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
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
    res.Status(201).send(item);
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

    res.Status(200).send(item);

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

module.exports = { getTasks, getTaskById, getNewConsults, getMyTasks, createTask, updateTask, deleteTask };
