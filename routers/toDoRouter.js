const express = require("express");
const { ToDoRecord }= require("../records/todo.record");
const toDoRouter = express.Router();

toDoRouter
  .get("/", async (req, res) => {
    const records = await ToDoRecord.findAll();
    records.sort((a, b) => a.date < b.date && 1 || -1);
    const todos = records.map(record => {
      const friendlyDate = String(new Date(record.date).toLocaleDateString() + " " + new Date(record.date).toLocaleTimeString())
      return {
        ...record,
        date: friendlyDate,
      }
    })
    res.render("todos/todosAll", {
      todos,
      }
    );
  })
  .post("/add", async (req, res) => {
    const {note} = req.body;
    const newNote = new ToDoRecord({title: note,});
    await newNote.insert();
    res.render("todos/added");
  })
  .delete("/:id/", async (req, res) => {
    const {id} = req.params;
    const noteToDelete = await ToDoRecord.find(id);
    await noteToDelete.delete();
    res.render("todos/delete");
  })

module.exports = {
  toDoRouter,
}
