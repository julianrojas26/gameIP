import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/routes.js";
import conexion from "../DB/conection.js";
import { fsync, readFileSync, writeFileSync } from "fs";


//server
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(indexRoutes);

app.use(express.static(join(__dirname, "/public")));

app.listen(3000);
console.log("server is listening on port" + 3000);

//DB

function pedir() {
  conexion.query(
    "select id, nombre, contraseña, correo from usuario",
    (err, res) => {
      if (err) throw err;
      writeFileSync(
        "./src/data/data.js",
        "export const data = " + JSON.stringify(res)
      );
    }
  );
  conexion.end();
}

export const insertar = (nombre, correo, pass, img) => {
  let buff = readFileSync(join(__dirname, "/uploads", img));
  let base = buff.toString("base64");
  conexion.query(
    "insert into usuario (nombre, correo, contraseña, imagen) values (?,?,?,?)",
    [nombre, correo, pass, base],
    (err, res) => {
      if (err) throw err;
      console.log("se inserto correctamente el usuario");
    }
  );
};
