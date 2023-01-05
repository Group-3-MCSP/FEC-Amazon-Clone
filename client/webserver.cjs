const express = require("express");
const cors = require("cors");

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
