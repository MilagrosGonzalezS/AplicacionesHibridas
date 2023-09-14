import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usuarios = [
  {
    id: 1,
    nombre: "Sofia",
    apellido: "Dialeva",
    usuario: "sofidialeva",
    email: "sofi@gmail.com",
    edad: 28,
    cursos: ["Figma", "React Native", "Linkedin"],
  },
  {
    id: 2,
    nombre: "Bautista",
    apellido: "Saravia",
    usuario: "bautisaravia",
    email: "bauti@gmail.com",
    edad: 27,
    cursos: ["Illustrator", "After Effects", "Photoshop"],
  },
  {
    id: 3,
    nombre: "Valentina",
    apellido: "Ferrar",
    usuario: "24",
    email: "valenferrari@gmail.com",
    edad: 24,
    cursos: ["Figma", "Illustrator", "Javascript"],
  },
  {
    id: 4,
    nombre: "Paula",
    apellido: "Gonzalez",
    usuario: "paulagonzalez",
    email: "polisampa@gmail.com",
    edad: 26,
    cursos: ["After Effects", "UX", "Linkedin"],
  },
];

const cursos = [
  {
    id: 1,
    nombre: "Figma",
    docente: "Susana Horia",
  },
  {
    id: 2,
    nombre: "React Native",
    docente: "Camila Marcos",
  },
  {
    id: 3,
    nombre: "Linkedin",
    docente: "Esteban Quito",
  },
  {
    id: 4,
    nombre: "Illustrator",
    docente: "Amalia Bovio",
  },
  {
    id: 5,
    nombre: "After Effects",
    docente: "Martina Feldkamp",
  },
  {
    id: 6,
    nombre: "Photoshop",
    docente: "Federico Blanco",
  },
  {
    id: 7,
    nombre: "Javascript",
    docente: "Carlos Ferrer",
  },
  {
    id: 8,
    nombre: "UX",
    docente: "Valeria Meijide",
  },
];

app.get("/", (req, res) => {
  res.send("Buscá un usuario o curso");
});

app.get("/usuarios", (req, res) => {
  res.send({ usuarios });
});

app.get("/usuarios/:nombre", (req, res) => {
  let usuario = req.params.nombre;
  let usuarioFiltrado = usuarios.find((u) => u.nombre === usuario);
  if (!usuarioFiltrado) {
    res.send("Usuario no encontrado");
  }
  res.send(usuarioFiltrado);
});

app.get("/usuarios-por-curso/:nombreCurso", (req, res) => {
  const curso = req.params.nombreCurso;
  const usuariosEnCurso = usuarios.filter((u) => u.cursos.includes(curso));

  if (usuariosEnCurso.length === 0) {
    return res.status(404).json({ error: "No hay usuarios en este curso." });
  }

  res.json(usuariosEnCurso);
});

function validaciones(req, res, next) {
  const { nombre, apellido, usuario, email, edad, cursos } = req.body;

  if (!nombre || !apellido || !usuario || !email || !edad || !cursos) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  if (usuario.length > 20) {
    return res.status(400).json({
      error: "El nombre de usuario no debe exceder los 20 caracteres.",
    });
  }

  const caracteresEspeciales = /[%$#!*]/;
  if (caracteresEspeciales.test(usuario)) {
    return res.status(400).json({
      error: "El nombre de usuario no debe contener caracteres especiales.",
    });
  }

  if (edad < 18) {
    return res
      .status(400)
      .json({ error: "La edad debe ser mayor o igual a 18 años." });
  }

  if (cursos.length < 2) {
    return res
      .status(400)
      .json({ error: "Debes estar inscrito en al menos dos cursos." });
  }

  next();
}

app.post("/usuarios", validaciones, (req, res) => {
  const newUsuario = req.body;
  usuarios.push(newUsuario);
  res.status(201).json(newUsuario);
});

app.patch("/usuarios/:id", validaciones, (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.send(404).json({ message: "Usuario no encontrado" });
  }
  usuarios[index] = { ...usuarios[index], ...updatedFields };
  res.json(usuarios[index]);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  const deletedUser = usuarios.splice(index, 1);
  res.json(deletedUser);
});

app.get("/cursos", (req, res) => {
  res.send({ cursos });
});

app.get("/cursos/:nombre", (req, res) => {
  let curso = req.params.nombre;
  let cursoFiltrado = cursos.find((c) => c.nombre === curso);
  if (!cursoFiltrado) {
    res.send("Curso no encontrado");
  }
  res.send(cursoFiltrado);
});

app.get("/cursos-por-docente/:nombreDocente", (req, res) => {
  const docente = req.params.nombreDocente;
  const docentesEnCurso = cursos.filter((c) => c.docente.includes(docente));

  if (docentesEnCurso.length === 0) {
    return res
      .status(404)
      .json({ error: "No hay cursos dados por ese docente." });
  }

  res.json(docentesEnCurso);
});

app.post("/cursos", (req, res) => {
  const newCurso = req.body;
  cursos.push(newCurso);
  res.status(201).json(newCurso);
});

app.patch("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;
  const index = cursos.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.send(404).json({ message: "Curso no encontrado" });
  }
  cursos[index] = { ...cursos[index], ...updatedFields };
  res.json(cursos[index]);
});

app.delete("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cursos.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }
  const deletedCourse = cursos.splice(index, 1);
  res.json(deletedCourse);
});

app.listen(2023, () => {
  console.log("Listening on port 2023...");
});
