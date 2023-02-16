import mysql from 'mysql2'
import fs from 'fs'

var conexion = mysql.createConnection({
  host: "localhost",
  database: "gameIP",
  user: "root",
  password: "123456",
});

conexion.connect((err) => {
  if (err) {
    console.log(err.stack);
    return;
  }
});

export default conexion;
/*
let buff = fs.readFileSync("./image/nose.png");
let base = buff.toString("base64");

let New = new Buffer(base, "base64");
fs.writeFileSync("./image/logo.png", New);

console.log(base); */
