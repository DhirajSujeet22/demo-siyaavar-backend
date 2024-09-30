const Product = require("../model/Product_Schema");

// ================================================

// exports.createProduct = async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     discountPercentage,
//     rating,
//     stock,
//     brand,
//     category,
//     thumbnail,
//     images,
//   } = req.body;

//   const product = new Product({
//     title,
//     description,
//     price,
//     discountPercentage,
//     rating,
//     stock,
//     brand,
//     category,
//     thumbnail,
//     images,
//   });
//   try {
//     product.discountPrice = Math.round(
//       product.price * (1 - product.discountPercentage / 100)
//     );
//     const productSave = await product.save();
//     res.status(201).json(productSave);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ error: "Failed to create product", details: error.message });
//   }
// };

// ================================================

exports.fetchAllProduct = async (req, res) => {
  const { _search, category, brand, _sort, _order, _page, _limit } = req.query;

  let query = Product.find({}); // Initialize the query object

  // Searching functionality
  if (_search) {
    const searchValues = _search
      .split(" ")
      .map((value) => value.trim().toLowerCase());
    const searchFilters = searchValues.map((value) => ({
      $or: [
        { title: { $regex: value, $options: "i" } },
        { category: { $regex: value, $options: "i" } },
        { brand: { $regex: value, $options: "i" } },
      ],
    }));
    query = query.find({ $and: searchFilters });
  }

  // -----------------------------------------------

  // Category functionality

  if (category) {
    const categoryFilters = category.split(",").map((catName) => ({
      category: { $regex: new RegExp(catName.trim(), "i") },
    }));

    query = query.find({ $or: categoryFilters });
  }

  // -----------------------------------------------

  // Brand functionality
  if (brand) {
    const brandFilters = brand.split(",").map((brandName) => ({
      brand: { $regex: new RegExp(brandName.trim(), "i") },
    }));

    query = query.find({ $or: brandFilters });
  }

  // -----------------------------------------------

  // Sorting functionality
  if (_sort && _order) {
    const sortOrder = _order.toLowerCase() === "desc" ? -1 : 1;
    query = query.sort({ [_sort]: sortOrder });
  }

  // -----------------------------------------------

  const totalDocs = await Product.countDocuments(query.getFilter());
  // Use `getFilter()` to get the current query condition

  // -----------------------------------------------

  // Pagination functionality
  if (_page && _limit) {
    const Page = Number(_page);
    const PageSize = Number(_limit);
    const Skip = (Page - 1) * PageSize;
    query = query.skip(Skip).limit(PageSize);
  }

  // -----------------------------------------------

  try {
    const allProduct = await query;
    res.set("X-Total-Count", totalDocs), res.status(200).json(allProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

// ================================================

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const productById = await Product.findById(id);
    res.status(200).json(productById);
  } catch (error) {
    res.status(400).json(error);
  }
};

// ================================================

// exports.updateProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     product.discountPrice = Math.round(
//       product.price * (1 - product.discountPercentage / 100)
//     );

//     const updatedProduct = await product.save();
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// ================================================

// exports.deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Product.findByIdAndDelete(id);
//     res.status(200).json("Product Deleted Successfully");
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };
