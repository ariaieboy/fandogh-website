import express from "express";
import { Nuxt, Builder } from "nuxt";
var cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const host = process.env.HOST || "0.0.0.0"; // "10.0.0.108";
const port = process.env.PORT || 4000;

app.set("port", port);

app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
// console.log("Server listening on " + host + ":" + port); // eslint-disable-line no-console
