const express = require("express");
const app = express();
const port = 3001;
const cors = require(`cors`);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const routerVersi1 = require("./src/routes/Router");
app.use("/api/v1", routerVersi1);
