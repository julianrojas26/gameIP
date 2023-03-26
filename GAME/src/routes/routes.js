import { Router } from "express";
import multer from "multer";
import { insertar } from "../index.js";
import { pedir } from "../index.js";

const router = Router();
const nombre = "";

/// descargar imagen
const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req, file, cb) => {
    cb("", file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const file = upload.single("file");
/// ruta index
router
  .get("/index", (req, res) => {
    res.render("index");
  })
  .post("/index", file, (req, res) => {
    const nombre = req;
    console.log(nombre.file.filename);
    console.log(nombre.body);
    insertar(
      nombre.body.name,
      nombre.body.email,
      nombre.body.password,
      nombre.file.filename
    );
    res.send("index");
  });

/// ruta log
router.get("/", (req, res) => {
  const data = pedir();
  const users = JSON.stringify(data).toString()
  res.render("log", { dirs: ["Log In", "Sign In"], data: users});
});

/// ruta sign
router.get("/sign", (req, res) => {
  res.render("sign", { dirs: ["Sign In", "Log In"], nombre: nombre });
});

export default router;
