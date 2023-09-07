import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Milagros Gonzalez");
});

app.get("/materia", (req, res) => {
  res.send("Aplicaciones Híblidas / Martes y jueves 21.10hs");
});

app.get("/profesor", (req, res) => {
  res.send("Camila Belén Marcos Galbán");
});

const technologies = ["React", "Tailwind", "Laravel", "NodeJS", "MySQL"];

app.get("/stack/:tech", (req, res) => {
  let tech = req.params.tech;
  let found = false;
  for (let i = 0; i < technologies.length; i++) {
    if (tech === technologies[i]) {
      found = true;
      break;
    }
  }
  found
    ? res.send("Dónde te dejo mi CV?")
    : res.send("A leer la documentación entonces...");
});

const productos = [
  {
    id: 1,
    nombre: "Mayonesa",
    precio: 300,
  },
  {
    id: 2,
    nombre: "Atun",
    precio: 550,
  },
  {
    id: 3,
    nombre: "Arroz",
    precio: 180,
  },
  {
    id: 4,
    nombre: "Manteca",
    precio: 400,
  },
  {
    id: 5,
    nombre: "Arvejas",
    precio: 250,
  },
  {
    id: 6,
    nombre: "Fideos",
    precio: 350,
  },
  {
    id: 7,
    nombre: "Aceite",
    precio: 600,
  },
  {
    id: 8,
    nombre: "Pan",
    precio: 650,
  },
  {
    id: 9,
    nombre: "Salsa de Tomate",
    precio: 210,
  },
  {
    id: 10,
    nombre: "Harina",
    precio: 700,
  },
];

app.get("/productos", (req, res) => {
  // Recibir query "minimo" y "maximo" para filtrar por rango de precios
  const minimo = req.query.minimo;
  const maximo = req.query.maximo;

  if (minimo && maximo) {
    const productosFiltrados = productos.filter((producto) => {
      return (
        producto.precio >= parseInt(minimo) &&
        producto.precio <= parseInt(maximo)
      );
    });
    res.json(productosFiltrados);
  } else if (minimo && !maximo) {
    const productosFiltrados = productos.filter((producto) => {
      return producto.precio >= parseInt(minimo);
    });
    res.json(productosFiltrados);
  } else if (!minimo && maximo) {
    const productosFiltrados = productos.filter((producto) => {
      return producto.precio <= parseInt(maximo);
    });
    res.json(productosFiltrados);
  } else {
    res.json(productos);
  }
});

app.get("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = productos.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 not found!</h1>");
});

app.listen(2023, () => {
  console.log("Server listening on port 2023...");
});
