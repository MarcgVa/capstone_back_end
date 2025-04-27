require('dotenv').config();
const { prisma, jwt } = require('../../common/common');

const getTodos = async (req, res) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.todos.findMany({
    where: {
      userId: { equals: id, }
    },
  });
  res.send(items);
};

const getMyTodos = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.todos.findMany({
    where: {
      assignee: { equals: req.body.email, }
    },
  });
  res.send(items);
};

const createTodo = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const createdBy = jwt.verify(token, process.env.JWT_SECRET);
  const { title, description, dueDate, assignedTo } = req.body;
  const item = await prisma.todos.create({
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

const updateTodo = async (req, res, next) => {
  const token = req.headers?.authorization.split(' ')[1];
  const updatedBy = jwt.verify(token, process.env.JWT_SECRET);
  try{
    const item = await prisma.todos.update({
      where: {
        id: req.params.itemId,
      },
      data: req.body,
    });
  } catch(error) {
    next(error);
  }
  res.send(item);
}

const deleteTodo = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  const createdBy = jwt.verify(token, process.env.JWT_SECRET);
  const id = req.params.id * 1;

  try {
    await prisma.todos.delete({
      where: {
        id,
        createdBy,
      },
    });
     res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
}


module.exports = {
  getTodos,
  getMyTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};