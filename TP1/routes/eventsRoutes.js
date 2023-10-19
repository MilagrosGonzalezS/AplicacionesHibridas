import express from "express";
import Event from "../models/events_model.js";
import eventValidations from "../middlewares/eventValidations.js";
import tokenVerification from "../middlewares/auth.js";
const route = express.Router();

route.get("/", (req, res) => {
  const min = req.query.min;
  const max = req.query.max;
  const page = req.query.page;
  const amount = req.query.amount;
  const skip = (page - 1) * amount;

  if (min && max) {
    let result = getEventsByPriceRange(min, max);
    result
      .then((events) => {
        res.json({
          events,
        });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else if (page && amount) {
    let result = getEventsWithPagination(amount, skip);
    result
      .then((events) => {
        res.json({
          events,
        });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else if ((min && !max) || (!min && max)) {
    res.send("Complete the range (min and max)");
  } else if ((page && !amount) || (!page && amount)) {
    res.send("Provide page and amount of events you want to see");
  } else {
    let result = getEvents();
    result
      .then((events) => {
        res.json({
          events,
        });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  }
});

route.get("/expensiveFirst", (req, res) => {
  let result = getEventsOrderedbyPrice();
  result.then((events) => {
    res.json({
      events,
    });
  });
});

route.get("/:id", (req, res) => {
  let result = getEventById(req.params.id);
  result
    .then((event) => {
      if (event.length < 1) {
        res.send("Event not found");
      } else {
        res.json({
          event,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.post("/", eventValidations, tokenVerification, (req, res) => {
  let body = req.body;
  let result = createEvent(body);
  result
    .then((event) => {
      res.json({
        valor: event,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.put("/:name", tokenVerification, (req, res) => {
  let result = updateEvent(req.body, req.params.name);
  result
    .then((event) => {
      res.json({
        event,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.delete("/:id", tokenVerification, (req, res) => {
  let id = req.params.id;
  let deleted = deleteEvent(id);
  deleted
    .then((event) => {
      res.json({
        valor: event,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

async function createEvent(body) {
  let event = new Event({
    name: body.name,
    description: body.description,
    price: body.price,
    date: body.date,
  });
  return await event.save();
}

async function getEvents() {
  let events = await Event.find();
  return events;
}

async function getEventById(id) {
  let event = await Event.find({ _id: id });
  if (event) {
    return event;
  } else {
    return "Event not found";
  }
}

async function getEventsByPriceRange(min, max) {
  let events = await Event.find({ price: { $gte: min, $lte: max } });
  return events;
}

async function getEventsWithPagination(amount, skip) {
  let events = await Event.find().limit(amount).skip(skip);
  return events;
}

async function getEventsOrderedbyPrice() {
  let events = await Event.find().sort({ price: -1 });
  return events;
}

async function updateEvent(body, name) {
  let event = await Event.updateOne(
    { name: name },
    {
      $set: {
        description: body.description,
        price: body.price,
        date: body.date,
      },
    }
  );
  return event;
}

async function deleteEvent(id) {
  let deleted = await Event.deleteOne({ _id: id });
  return deleted;
}

export default route;
