const express = require("express");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const { toDoRouter } = require("./routers/toDoRouter");
const { homeRouter } = require("./routers/homeRouter");
const {handleError} = require("./utils/error");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(express.json());


app.engine(".hbs", hbs({
  extname: ".hbs",
  // helpers: handlebarsHelpers,
}));
app.set("view engine", ".hbs");

app.use("/", homeRouter)
app.use("/todo", toDoRouter);

app.use(handleError);

app.listen(port, "localhost", () => {
  console.log(`Listening on port ${port}`);
});



// (async() => {
//
//   // const foundToDo = await ToDoRecord.find('1390f225-ce09-472c-a03a-7785177515f4');
//   // const newToDoItem = new ToDoRecord({title: 'Sixth to do item!'});
//   // const newId = await newToDoItem.insert();
//   // const deletedItem = await foundToDo.delete();
//   // console.log(`New todo item added with ID ${newId}`);
//   // console.log(`Item with ID ${deletedItem} has been deleted!`)
//
//   // const foundToDo = await ToDoRecord.find('1390f225-ce09-472c-a03a-7785177515f4');
//   // foundToDo.title = 'Nowy wpis zastepujący stary'
//   // const update = await foundToDo.update();
//   // console.log(`Todo item with id ${update} has been updated`)
//   const foundAll = await ToDoRecord.findAll();
//   console.log(foundAll)
//
//   await pool.end()
// })();
