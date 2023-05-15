const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/data", (req, res) => {
  fs.readFile("./data2.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post("/data", (req, res) => {
  const newData = req.body;
  fs.writeFile("./data2.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send({ status: "success" });
    }
  });
});

// Start server
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
