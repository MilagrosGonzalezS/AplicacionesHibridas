export default function eventValidations(req, res, next) {
  const { name, description, price, date } = req.body;

  if (!name || !description || price === null || !date) {
    return res.status(400).json({ error: "All the fields are required." });
  }

  if (description.length > 100) {
    return res.status(400).json({
      error: "Maximum length of description is 100 characters",
    });
  }

  next();
}
