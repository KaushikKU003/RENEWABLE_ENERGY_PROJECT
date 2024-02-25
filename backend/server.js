const express = require("express");
const adminRouter = require("./controllers/adminController");
const projectRouter = require('./controllers/projectController')
const financeRouter = require("./controllers/financeController")

const app = express();

app.use(express.json());


app.use("/app/admin", adminRouter);
app.use("/app/project",projectRouter)
app.use("/app/finance",financeRouter)

app.listen(4000, () => {
  console.log(`Server running successfully on port 4000`);
});


