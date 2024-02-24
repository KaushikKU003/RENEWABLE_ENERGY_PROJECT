const express = require("express");
const adminRouter = require("./controllers/adminController");
const projectRouter = require('./controllers/projectController')

const app = express();

app.use(express.json());


app.use("/app/admin", adminRouter);
app.use("/app/project",projectRouter)

app.listen(4000, () => {
  console.log(`Server running successfully on port 4000`);
});


