const path = require("path");
const fs = require("fs");
const os = require("os");

const notasPath = path.join(__dirname, "archivos", "notas.txt");
const infoPath = path.join(__dirname, "archivos", "info.txt");

fs.writeFile(
  infoPath,
  `Sistema operativo: ${os.platform + " Arquitectura: " + os.arch}`,
  (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("mensaje creado");
    }
  }
);

fs.writeFileSync(notasPath, "\nMilagros, web developer", { flag: "a" });

console.log(notasPath, infoPath);
