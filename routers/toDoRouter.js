const express = require("express");
const { ToDoRecord }= require("../records/todo.record");
const toDoRouter = express.Router();

toDoRouter
  .get("/", async (req, res) => {
    const records = await ToDoRecord.findAll();
    records.sort((a, b) => a.date < b.date && 1 || -1);
    const todos = records.map(record => {
      return {
        ...record,
        date: record.date.toLocaleDateString() + " " + record.date.toLocaleTimeString(),
      }
    })
    res
      .status(200)
      .render("todos/todosAll", {
      todos,
      }
    );
  })
  .get("/:id", async (req, res, next) => {
    try {
      const {id} = req.params;
      const foundNote = await ToDoRecord.find(id);
      const {title} = foundNote
      res
        .status(200)
        .render("todos/edit", {
          id,
          title,
        })
    } catch (err) {
      next(err)
    }
  })
  .post("/add", async (req, res, next) => {
    try {
      const {note} = req.body;
      const newNote = new ToDoRecord({title: note,});
      await newNote.insert();
      res
        .status(200)
        .render("todos/added");
    } catch (err) {
      next(err);
    }
  })
  .put("/:id", async(req, res, next) => {
    try {
      const {id} = req.params
      const {note} = req.body;
      const updatedNote = new ToDoRecord({id, title: note,})
      await updatedNote.update();
      res
        .status(202)
        .render("todos/updated")
    } catch (err) {
      next(err)
    }
  })
  .delete("/:id", async (req, res) => {
    const {id} = req.params;
    const noteToDelete = await ToDoRecord.find(id);
    await noteToDelete.delete();
    res
      .status(200)
      .render("todos/delete");
  })

module.exports = {
  toDoRouter,
}
