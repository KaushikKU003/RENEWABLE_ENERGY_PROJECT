const express = require("express");
const adminRouter = require("./controllers/adminController");
const projectRouter = require('./controllers/projectController')
const financeRouter = require("./controllers/financeController")
const locationRouter = require("./controllers/locationController")
const organizationRouter = require("./controllers/organiztionController")
const benefitRouter = require("./controllers/benefitController")
const riskRouter = require("./controllers/riskController")


const app = express();

app.use(express.json());


app.use("/app/admin", adminRouter);
app.use("/app/project",projectRouter)
app.use("/app/finance",financeRouter)
app.use("/app/location",locationRouter)
app.use("/app/organization",organizationRouter)
app.use("/app/benefit",benefitRouter)
app.use("/app/risk",riskRouter)



app.listen(4000, () => {
  console.log(`Server running successfully on port 4000`);
});


