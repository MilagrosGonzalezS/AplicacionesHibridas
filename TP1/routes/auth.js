import express from "express";
import User from "../models/users_model.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const route = express.Router();

route.post("/", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        const validatePassword = bcrypt.compareSync(
          req.body.password,
          data.password
        );
        if (!validatePassword)
          return res.status(400).json({ msj: "Incorrect Password" });
        // res.json({ data });
        const jwToken = jwt.sign(
          {
            user: { _id: data._id, username: data.username, email: data.email },
          },
          process.env.SEED,
          { expiresIn: process.env.EXPIRATION }
        );
        res.json({
          user: {
            _id: data._id,
            username: data.username,
            email: data.email,
          },
          jwToken,
        });
      } else {
        res.status(400).json({
          msj: "The user does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ msj: "Service Error" });
    });
});

export default route;
