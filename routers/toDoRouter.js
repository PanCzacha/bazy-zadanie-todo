const express = require("express");
const { ToDoRecord }= require("../records/todo.record")
const toDoRouter = express.Router();

toDoRouter
  .get("/", async (req, res) => {
    const todos = await ToDoRecord.findAll();
    todos.sort((a, b) => a.date < b.date && 1 || -1);
    res.render("todos/todosAll", {
      todos,
      }
    );
  })
  .post("/add", (res, req) => {
    // const {note} = req.body;
    console.log(req.body);
    // const newNote = new ToDoRecord({title:note});
    // await newNote.insert();
    // res.render("todos/added");
  })
  .delete("/:id/", async (req, res) => {
    const {id} = req.params;
    const noteToDelete = await ToDoRecord.find(id);
    await noteToDelete.delete()
    res.render("todos/delete");
  })

module.exports = {
  toDoRouter,
}
