// Controller de Products
const { productModel } = require("../Models/index");

// Metodos del controller
const getAllProducts = async (req, res, next) => {
  try {
    const response = await productModel.find({}).populate("category");
    if (response.flat().length > 0) {
      const Products = response?.map((p) => {
        return {
          id: p._id,
          sku: p.sku,
          name: p.name,
          price: p.price,
          weight: p.weight,
          description: p.description,
          thubnail: p.thumbnail,
          image: p.image,
          category: p.category?.name,
          createDate: p.create_date,
          stock: p.stock,
        };
      });
      res.status(200).send(Products);
    } else {
      res.status(400).send("There's no Products to show right now");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

// product por id
const getProductById = async (req, res, next) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("category");

    res.status(200).json({
      product,
    });

    next();
  } catch (error) {
    console.log(error);
  }
};

// product por name
const getProductByName = async (req, res) => {
  try {
    let products = await productModel.find().populate("category");

    if (req.params.key)
      products = products.filter((p) =>
        p.name.toLowerCase().includes(req.params.key.toLowerCase())
      );
    console.log(products);
    res
      .status(200)
      .json({ status: "success", count: products.length, products });
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const {
      sku,
      name,
      price,
      weight,
      description,
      thumbnail,
      image,
      category,
      stock,
    } = productData;
    const newProduct = await productModel.create({
      sku,
      name,
      price,
      weight,
      description,
      thumbnail,
      image,
      category,
      create_date: new Date(),
      stock,
    });

    if (!newProduct) {
      res.status(400).send("The New Product can't be created");
    } else {
      res.status(200).send({ msg: "New Product Added", newProduct });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    console.log("edit...", productData);
    const {
      id,
      sku,
      name,
      price,
      weight,
      description,
      thumbnail,
      image,
      category,
      stock,
    } = productData;
    const editProduct = await productModel.findByIdAndUpdate(
      id,
      {
        sku,
        name,
        price,
        weight,
        description,
        thumbnail,
        image,
        category,
        stock,
      },
      { new: true }
    );
    console.log(editProduct);
    if (editProduct) {
      res.status(200).send("Product Successfully Updated");
    } else res.status(400).send("Product can't be created");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  editProduct,
  addProduct,
};
