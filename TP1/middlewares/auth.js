import "dotenv/config";
import jwt from "jsonwebtoken";

let tokenVerification = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(400).json({
        err: "User not authenticated",
      });
    }
    req.user = decoded.user;
    next();
  });
};

export default tokenVerification;
