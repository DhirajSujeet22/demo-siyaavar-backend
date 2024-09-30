const express = require("express");
const server = express();
require("dotenv").config();
require("./Database/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// =================================

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  exposedHeaders: ["X-Total-Count"],
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// =================================

const AuthRouter = require("./routes/Auth_Route");
const ProductRouter = require("./routes/Product_Route");
const CartRouter = require("./routes/Cart_Route");
const UserRouter = require("./routes/User_Route");
const OrdersRouter = require("./routes/Orders_Route");

// =================================

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.json());
// =====================================

server.use("/auth", AuthRouter);
server.use("/product", ProductRouter);
server.use("/user", UserRouter);
server.use("/cart", CartRouter);
server.use("/order", OrdersRouter);

// =====================================

server.get("/", (req, res) => {
  res.status(200).json({ message: "Running..." });
});
// =====================================

server.listen(process.env.PORT, () => {
  console.log(`Port is Listening on ${process.env.PORT}`);
});
