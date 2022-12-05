const express = require('express');
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts")
const petRoutes = require("./routes/pets")

const app = express();

mongoose.connect("mongodb+srv://viris_gv:KkcHezfDU4vlpGFM@clusterv1.10g7o5m.mongodb.net/node-angulars?retryWrites=true&w=majority")
  .then(() => {
    console.log('Base de datos conectada :)');
  })
  .catch(() => {
    console.log('Conexion fallida con exito :)');
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request, Content-Type, Accept");
  res.setHeader("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();

});

app.use("/api.posts", postRoutes);
app.use("/api.pets", petRoutes);


module.exports = app;
