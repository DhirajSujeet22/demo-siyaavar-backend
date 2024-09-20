const express = require("express");
const server = express();
require("dotenv").config();
require("./Database/connection");
const cors = require("cors");
const router = require("./routes/auth_routers");
const RouterProduct = require("./routes/RouteProduct");
const cookieParser = require("cookie-parser");
// =================================

const corsOptions = {
  // origin: "http://127.0.0.1:5500",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// =================================

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.json());
// =====================================

server.use("/api", RouterProduct);
server.use("/api", router);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Running..." });
});
// =====================================

server.listen(process.env.PORT, () => {
  console.log(`Port is Listening on ${process.env.PORT}`);
});
