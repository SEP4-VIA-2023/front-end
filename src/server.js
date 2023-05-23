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
  fs.readFile("./data2.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      let existingData = JSON.parse(data);
      existingData.push(newData);
      fs.writeFile(
        "./data2.json",
        JSON.stringify(existingData, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.send({ status: "success" });
          }
        }
      );
    }
  });
});

app.delete("/data/:title", (req, res) => {
  const title = req.params.title;

  fs.readFile("./data2.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      let existingData = JSON.parse(data);
      const index = existingData.findIndex(
        (profile) => profile.title === title
      );

      if (index > -1) {
        existingData.splice(index, 1);
        fs.writeFile(
          "./data2.json",
          JSON.stringify(existingData, null, 2),
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send(err);
            } else {
              res.send({ status: "success" });
            }
          }
        );
      } else {
        res.status(404).send({ status: "Profile not found" });
      }
    }
  });
});

// Start server
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
