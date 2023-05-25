const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
//data used for the signin function in the login component
/*
app.get("/login-data", (req, res) => {
  fs.readFile("./logindata.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
});
*/

//data used for reading profile-presets
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

//data used for writiing to a temporry file for fetching using modern browser fetch
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  fs.readFile("./logindata.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      const users = JSON.parse(data);
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        res.send({ status: "success", message: "Login successful" });
      } else {
        res
          .status(401)
          .send({ status: "failure", message: "Invalid email or password" });
      }
    }
  });
});

//for signing up
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  fs.readFile("./logindata.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      const users = JSON.parse(data);
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        res.status(409).send({ status: "failure", message: "Email already exists" });
      } else {
        users.push({ email, password });
        fs.writeFile("./logindata.json", JSON.stringify(users, null, 2), 'utf8', (err) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.send({ status: "success", message: "Signup successful" });
          }
        });
      }
    }
  });
});



//data used for writing profile-presets
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
