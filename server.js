const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database/database");
const port = process.env.PORT || 5000;
const OpenApiValidator = require("express-openapi-validator");
const apiSpec = "./definitions/backendApi.yml";
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Auth = require("./Authentication/Auth");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
const addRouter = require("./routes/add");
const getAll = require("./routes/getall");
const update = require("./routes/update");
const deleteRoute = require("./routes/delete");
let protectedRoutes = ["/api/update", "/api/delete"];
db.init();
app.use(cookieParser());
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  })
);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
app.use((req, res, next) => {
  if (protectedRoutes.includes(req.url)) {
    let returnVal = Auth.checker(req, res);
    if (returnVal !== false) {
      next();
    } else {
      res.status(401).json({
        status: "Failure",
        Message: "Sorry you are not allowed to perform this operation",
      });
    }
  } else {
    next();
  }
});
app.post("/api/signin", Auth.signinHandler);
app.post("/api/refresh", Auth.refreshHandler);
app.get("/api/check", Auth.welcomeHandler);
app.get("/api/logout", Auth.logoutHandler);
app.use("/api/add", addRouter);
app.use("/api/getall", getAll);
app.use("/api/update", update);
app.use("/api/delete", deleteRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
