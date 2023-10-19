import express from "express";
import User from "../models/users_model.js";
import userValidations from "../middlewares/userValidations.js";
import tokenVerification from "../middlewares/auth.js";
import bcrypt from "bcrypt";

const route = express.Router();

route.get("/", tokenVerification, (req, res) => {
  const domain = req.query.domain;
  if (domain) {
    let result = getUsersbyEmailDomain(domain);
    result
      .then((users) => {
        if (users.length < 1) {
          res.send("No match");
        } else {
          res.json({
            users,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    let result = getUsers();
    result
      .then((users) => {
        res.json({
          users,
        });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  }
});

route.get("/:username", tokenVerification, (req, res) => {
  let result = getUserByUsername(req.params.username);
  result
    .then((user) => {
      if (user.length < 1) {
        res.send("User not found");
      } else {
        res.json({
          user,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.post("/", userValidations, (req, res) => {
  let body = req.body;
  let result = createUser(body);
  result
    .then((user) => {
      res.json({
        valor: user,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.put("/:email", tokenVerification, (req, res) => {
  let result = updateUser(req.body, req.params.email);
  result
    .then((user) => {
      res.json({
        user,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.delete("/:id", tokenVerification, (req, res) => {
  let id = req.params.id;
  let deleted = deleteUser(id);
  deleted
    .then((user) => {
      res.json({
        valor: user,
      });
    })
    .catch((err) => {
      res.status(400).json({ err: "User not found" });
    });
});

async function createUser(body) {
  let user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });
  return await user.save();
}

async function getUsers() {
  let users = await User.find({ state: true });
  return users;
}

async function getUserByUsername(username) {
  let user = await User.findOne({ username: username });
  return user;
}

async function getUsersbyEmailDomain(domain) {
  let users = await User.find({ email: { $regex: domain } });
  return users;
}

async function updateUser(body, email) {
  let user = await User.updateOne(
    { email: email },
    {
      $set: {
        username: body.username,
        password: body.password,
      },
    }
  );

  return user;
}

async function deleteUser(id) {
  let deleted = await User.deleteOne({ _id: id });
  return deleted;
}

export default route;
