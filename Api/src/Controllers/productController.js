// Controller de Products
const { productModel } = require("../Models/index");

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
          image: p.image,
          status: p.status,
          brand: p.brand,
          benchmark: p.benchmark,
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

// product por name
const getProductByName = async (req, res) => {
  try {
    let products = await productModel.find().populate("category");

    const name = req.params.key;

    if (name)
      products = products.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
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
      status,
      image,
      brand,
      benchmark,
      category,
      stock,
    } = productData;
    const foundProduct = await productModel.findOne({ sku: sku });
    if (foundProduct) {
      res
        .status(400)
        .send("The New Product can't be created, it SKU already exists");
    } else if (sku && name && price && image && brand && category && stock) {
      const newProduct = await productModel.create({
        sku,
        name,
        price,
        weight: weight || 0,
        description: description || name,
        status: true,
        image,
        brand,
        benchmark: benchmark || 0,
        category,
        create_date: new Date(),
        stock,
      });

      if (!newProduct) {
        res.status(400).send("The New Product can't be created");
      } else {
        res.status(200).send({ msg: "New Product Added", newProduct });
      }
    } else {
      res
        .status(400)
        .send("The New Product can't be created. Missing required data");
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
      status,
      image,
      brand,
      benchmark,
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
        status,
        image,
        brand,
        benchmark,
        category,
        stock,
      },
      { new: true }
    );
    console.log(editProduct);
    if (editProduct) {
      res.status(200).send("Product Successfully Updated");
    } else res.status(400).send("Product can't be created");

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

const getProductById = async (req, res, next) => {
  const id = req.params.id;
  try {
    //tienen que mandar un id como este 635ad2a356d5ff1c0e93e083
    const product = await productModel.findById(id).populate("category");

    res.status(200).send(product);
    next();
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    //tienen que mandar un id como este 635ad2a356d5ff1c0e93e083
    const product = await productModel.findByIdAndDelete(id);

    res.status(200).json({ deleted: product });
    next();
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  getProductById,
  editProduct,
  addProduct,
  deleteProduct,
};
