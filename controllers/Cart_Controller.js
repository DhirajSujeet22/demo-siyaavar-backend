const Carts = require("../model/Cart_Schema");

// ================================================

exports.addToCarts = async (req, res) => {
  console.log(req.body);
  try {
    // const { id } = req.user;
    // const carts = new Carts({ ...req.body, user: id });
    const carts = await new Carts(req.body).save();
    console.log({ carts });
    // const response = await carts.save();
    console.log(carts + " saved successfully");
    // const response = await doc.populate("product");
    // res.status(201).json(response);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// ================================================

exports.fetchCartsByUser = async (req, res) => {
  // const { id } = req.user;
  try {
    // const response = await Carts.find({ user: id }).populate("product");
    const response = await Carts.find({}).populate("product");
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// ================================================

exports.updateCarts = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Carts.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// ================================================

exports.deleteCarts = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Carts.findByIdAndDelete(id);
    res.status(200).json("Product Deleted");
  } catch (error) {
    res.status(400).json(error);
  }
};
