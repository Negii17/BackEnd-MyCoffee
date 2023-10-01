const express = require("express");
const app = express();
const port = 3001;
const cors = require(`cors`);
const bodyParser = require("body-parser");

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v2/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const routerVersi1 = require("./src/routes/Router");
app.use("/api/v1", routerVersi1);
