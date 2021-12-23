const express = require("express");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const { toDoRouter } = require("./routers/toDoRouter");
const { homeRouter } = require("./routers/homeRouter");
const { handleError, handle404 } = require("./utils/error")
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(express.json());

app.engine(".hbs", hbs({
  extname: ".hbs",
}));
app.set("view engine", ".hbs");

app.use("/", homeRouter)
app.use("/todo", toDoRouter);

app.use(handleError);
app.use(handle404);

app.listen(port, "localhost", () => {
  console.log(`Listening on port ${port}`);
});
