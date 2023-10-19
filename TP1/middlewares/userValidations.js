export default function userValidations(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All the fields are required." });
  }

  if (username.length > 20) {
    return res.status(400).json({
      error: "Maximum length of username is 20 characters",
    });
  }

  const specialChar = /[%$#!*]/;
  if (specialChar.test(username)) {
    return res.status(400).json({
      error: "Username must not contain special characters",
    });
  }

  const emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({
      error: "Enter a valid email address",
    });
  }

  next();
}
