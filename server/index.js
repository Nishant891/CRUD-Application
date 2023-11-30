const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(
  cors({ origin: "https://spiffy-piroshki-8df607.netlify.app/", credentials: true })
);

app.options('*', cors());

app.use(express.json());

const port = 8000;

const urlDB = "mysql://root:4GbgdCfehh1Bh1EEGC512hggCD-46bHd@viaduct.proxy.rlwy.net:20995/railway";

const db = mysql.createConnection(urlDB);

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?,?,?)",
    [username, email, password],
    (err, result) => {
      console.log(err);
    }
  );

  res.status(200).json({ message: "Success" });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT* FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "No user" });
      }
    }
  );
});

app.post("/add", (req, res) => {
  const user_email = req.body.email;
  const task = req.body.task;

  db.query(
    "INSERT INTO tasks (user_email, task) VALUES (?,?)",
    [user_email, task],
    (err, result) => {
      console.log(err);
    }
  );

  res.status(200).json({ message: "Success" });
});

app.post("/delete", (req, res) => {
  const taskId = req.body.taskId;

  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [taskId],
    (err, result) => {
      res.status(200).json({ message: "Success" });
    }
  );

});

app.post("/update", (req, res) => {
  const taskId = req.body.taskId;
  const updatedTask = req.body.updatedTask;

  db.query(
    "UPDATE tasks SET task = ? WHERE id = ?",
    [updatedTask, taskId],
    (err, result) => {
      console.log(err);
    }
  );

  res.status(200).json({ message: "Success" });
});

app.get("/data", (req, res) => {

  const user_email = req.query.email;

  db.query(
    "SELECT * FROM tasks WHERE user_email = ?",
    [user_email],
    (err, result) => {
      res.send(result);
    }
  )
})

app.listen(port, () => {
  console.log(`Server online on ${port}`)
});
