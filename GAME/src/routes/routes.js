import { Router } from "express";
import { data } from "../data/data.js";
import multer, { diskStorage } from "multer";
import mimeTypes from "mime-types";
import { insertar } from "../index.js";

const router = Router();
const nombre = ""

/// descargar imagen
const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req, file, cb) => {
    cb(
      "",
      file.originalname +
        "." +
        mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({
  storage: storage,

});

const file = upload.single("file")
/// ruta index
router.get("/index", (req, res) => {
    res.render("index");
  }).post("/index", file, (req, res) => {
    const nombre = req.body;
    console.log(nombre)
    res.json({nombre});
});

/// ruta log
var string = JSON.stringify(data).toString();
router.get("/", (req, res) =>
  res.render("log", { dirs: ["Log In", "Sign In"], data: string })
);

/// ruta sign
router.get("/sign", (req, res) =>
  res.render("sign", { dirs: ["Home", "Log In"], nombre: nombre })
);

export default router;
