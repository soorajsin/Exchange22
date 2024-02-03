const express = require("express");
const app = express();
require("./DB/Connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes/Route");
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  console.log("server");
});

app.use(express.json());
app.use(cors());
app.use(router);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
