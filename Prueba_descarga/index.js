const express = require('express')
const multer = require('multer')

const app = express();

const upload = multer({
  dest: "uploads/",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/files", upload.single("avatar"), (req, res) => {
  res.send("Bien");
});

app.listen(3000, () => console.log("Server in port 3000"));
