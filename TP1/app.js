import express from "express";
import mongoose from "mongoose";
import events from "./routes/eventsRoutes.js";
import users from "./routes/usersRoutes.js";
import auth from "./routes/auth.js";
import "dotenv/config";

mongoose
  .connect("mongodb://127.0.0.1:27017/ventra", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado con la DB");
  })
  .catch(() => {
    console.log("Error al conectar con la DB");
  });

const app = express();

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/events", events);
app.use("/users", users);
app.use("/events", events);
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ventra</title>
  </head>
  <body>
    <h1  style="text-align: center;">Search for your favorite events</h1>
    <div style="display:flex; justify-content:space-evenly;">
      <div>
        <h2>Events</h2>
        <h3>Bring all the events</h3>
        <p>/events</p>
        <h3>Bring events by a price range</h3>
        <p>/events?min={20000}&max={120000} <strong>(both queries needed)</strong></p>
        <h3>Order by most expensive first</h3>
        <p>/events/expensiveFirst</p>
        <h3>Show with pagination</h3>
        <p>/events?page={2}&amount={3} <strong>(both queries needed)</strong></p>
        <h3>Bring an event by its ID</h3>
        <p>/events/{id}</p>
        <h3>Create an event</h3>
        <p>/events <strong>(auth needed)</strong></p>
        <p>post => { <br>
          "name" : "", <br>
          "description" : "", <br>
          "price" : 0, <br>
          "date" : "" <br>
        }</p>
        <h3>Update an event</h3>
        <p>/events/{name} <strong>(auth needed)</strong></p>
        <p>put => { <br>
          "name" : "", <br>
          "description" : "", <br>
          "price" : 0, <br>
          "date" : "" <br>
        }</p>
      </div>
      <div>
        <h2>Users</h2>
        <h3>Create a user</h3>
        <p>/users</p>
        <p>post => { <br>
          "username" : "", <br>
          "email" : "", <br>
          "password" : "" <br>
        }</p>
        <h3>Log in</h3>
        <p>/auth</p>
        <p>post => { <br>
          "username" : "", <br>
          "password" : "" <br>
        }</p>
        <h3>Bring all the users</h3>
        <p>/users <strong>(auth needed)</strong></p>
        <h3>Bring a user by username</h3>
        <p>/users/{username} <strong>(auth needed)</strong></p>
        <h3>Bring users by email domain</h3>
        <p>/users/{domain} <strong>(auth needed)</strong></p>
        
      </div>
    </div>
    <footer>
        <ul style="display:flex;">
            <li style="list-style:none; margin-left:1em;">Developer: Milagros Gonzalez</li>
            <li style="list-style:none; margin-left:1em;">Materia: Aplicaciones Híbridas</li>
            <li style="list-style:none; margin-left:1em;">Profe: Camila Marcos Galbán</li>
            <li style="list-style:none; margin-left:1em;">Curso: DWN4AP 2023</li>
        </ul>
    </footer>
    <script type="module" src="app.js"></script>
  </body>
</html>
  `);
});

app.listen(port, () => {
  console.log("Server running...");
});
