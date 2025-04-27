require('dotenv').config();
const { prisma, jwt } = require('../../common/common');

const getTodos = async (req, res) => {
  const token = req.headers?.authorization.splice(7);
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.todos.findMany({
    where: {
      userId: { equals: id, }
    },
  });
  res.send(items);
};

const getMyTodos = async (req, res, next) => {
  const token = req.headers?.authorization.splice(7);
  const id = jwt.verify(token, process.env.JWT_SECRET);
  const items = await prisma.todos.findMany({
    where: {
      assignee: { equals: req.body.email, }
    },
  });
  res.send(items);
};

const createTodo = async (req, res, next) => {
  const token = req.headers?.authorization.splice(7);
  const createdBy = jwt.verify(token, process.env.JWT_SECRET);
  const { title, description, dueDate, assignedTo } = req.body;
  const item = await prisma.todos.create({
    data: {
      title,
      description,
      dueDate,
      assignedTo,
      createdBy,
    },
  });
  res.send(item);
};

const updateTodo = async (req, res, next) => {
  const token = req.headers?.authorization.splice(7);
  const updatedBy = jwt.verify(token, process.env.JWT_SECRET);

  const item = await prisma.todos.update({
    where: {
      id: req.params.itemId,
    },
    data: {
      // TODO:  ADD UPDATE DATA - Figure out the code required to update only what is presented.
    },
  })
  
}

const deleteTodo = async (req, res, next) => {
  const token = req.headers?.authorization.splice(7);
  const id = jwt.verify(token, process.env.JWT_SECRET);

  if (createdBy !== id && updatedBy !== id && SYSTEM_ID !== id) { 
    res.send("Not Authorized to delete this item.");
    next();
  }
  
  try {
    await prisma.todos.delete({
      where: {
        id: req.params.itemId,
      },
    });
  } catch (ex) {
    next(ex);
  }
  res.sendStatus(204);
}


module.exports = {
  getTodos,
  getMyTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};