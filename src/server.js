const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Handle the active profile feature
let activeProfile = null; // Global variable to store active profile

app.post("/activeProfile", (req, res) => {
  const profile = req.body;

  fs.readFile("./data2.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      const existingProfiles = JSON.parse(data);
      const doesExist = existingProfiles.some(
        (existingProfile) => existingProfile.title === profile.title
      );

      if (!doesExist) {
        res.status(404).send({ status: "Profile not found" });
        return;
      }

      activeProfile = profile;

      // Write active profile to disk
      fs.writeFile(
        "./activeProfile.json",
        JSON.stringify(activeProfile, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.send({ status: "success", activeProfile: profile });
          }
        }
      );
    }
  });
});

app.get("/activeProfile", (req, res) => {
  fs.readFile("./activeProfile.json", "utf8", (err, data) => {
    if (err) {
      // If the active profile doesn't exist, respond with a 404 status
      res.status(404).send({ status: "No active profile" });
    } else {
      // If the active profile exists, send it in the response
      const activeProfile = JSON.parse(data);
      res.send(activeProfile);
    }
  });
});

// Rest of the routes
app.get("/data/:title", (req, res) => {
  const title = req.params.title;

  fs.readFile("./data2.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      let existingData = JSON.parse(data);
      const profile = existingData.find((profile) => profile.title === title);

      if (profile) {
        res.send(profile);
      } else {
        res.status(404).send({ status: "Profile not found" });
      }
    }
  });
});

app.put("/data/:title", (req, res) => {
  const title = req.params.title;
  const newData = req.body;

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
        existingData[index] = newData;

        fs.writeFile(
          "./data2.json",
          JSON.stringify(existingData, null, 2),
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send(err);
            } else {
              res.send({ status: "success", updatedProfile: newData });
            }
          }
        );
      } else {
        res.status(404).send({ status: "Profile not found" });
      }
    }
  });
});

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
