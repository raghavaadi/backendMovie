const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database/database");
const port = process.env.PORT || 5000;
const OpenApiValidator = require("express-openapi-validator");
const apiSpec = "./definitions/backendApi.yml";
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
const addRouter = require("./routes/add");
const getAll = require("./routes/getall");
const update = require("./routes/update");
const deleteRoute = require("./routes/delete");
db.init();
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  })
);

app.use("/api/add", addRouter);
app.use("/api/getall", getAll);
app.use("/api/update", update);
app.use("/api/delete", deleteRoute);
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
