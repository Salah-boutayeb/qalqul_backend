const express = require("express");
const cors = require("cors");
const app = express();
// express middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();
app.use(cors());
// app.use(express.json());

const port = process.env.PORT || 5555;
app.use("/", require("./routes/index"));
app.listen(port, () => {
  console.log(`server's runing on port ${port}`);
});
