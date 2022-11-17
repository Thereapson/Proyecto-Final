const { categoryModel } = require('../Models/index');
const { productModel } = require("../Models/index");
const { userModel } = require("../Models/index");

// referencia a Helpers

const {uploadImage} = require("../Helpers/cloudinary")

// funciones que son exclusivas para Admin

// Category

const listCategory = async (req, res, next) => {
  const {_start, _end, _sort, _order, q} = req.query
  try {
      const response = await categoryModel.find({})
      if(response.flat().length > 0) {
          const categories = response?.map(c => {
              return {
                  id: c._id,
                  name: c.name,
                  description: c.description,
              }
          })
          res.status(200)
          .header( 'Access-Control-Expose-Headers','X-Total-Count')
          .header('x-total-count', response?.length)         
          .send(categories?.slice(_start, _end))
      } else {
          res.status(400).send("There's no Categorys to show right now")
      }
  } catch (error) {
      console.error(error);
      next(error)
  }
}

const getCategoryById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await categoryModel.findById(id);
    const categoryF = formatCategory(response)
    res.status(200).send(categoryF);
    next();
  } catch (error) {
    console.log(error);
  }
};

const addCategory = async (req, res, next) => {
    try {
        const categoryData = req.body
        const { name, description } = categoryData
        if( name && description) {
            const newCategory = await categoryModel.create({
                name,
                description,
            })
            if(!newCategory) {
                return res.status(400).send("The New Category can't be created")
            } else {
                return res.status(200).send(newCategory)
            }
        } else {
            return res.status(400).send("The New Category can't be created, missing required data")
        }
    } catch(error) {
        console.error(error);
        next(error)
    }
}

const editCategory = async (req, res, next) => {    // hay que ajustarlo
    try {
        const categoryData = req.body
        console.log("editCategory", categoryData);
        const { id, name, description } = categoryData
        if( name && description) {
            const category = await categoryModel.findByIdAndUpdate(
                id,
                {
                name,
                description,
            })
            return res.status(200).send(category)
        } else {
            return res.status(400).send(category)
        }
    } catch(error) {
        console.error(error);
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await categoryModel.findByIdAndDelete(id);  
    res.status(200).json({ deleted: response });
    next();
  } catch (error) {
    console.log(error);
  }
};

 
// Product
const listProducts = async (req, res, next) => {
    const {_start, _end, _sort, _order, q, category} = req.query
    console.log(_start, _end, _sort, _order, q)
    try {
        if (!q) {
            const response = await productModel.find({}).populate("category");
            console.log(response)
            if (response.flat().length > 0) {
                const products = response?.map((p) => {return formatProduct(p)})
                res.status(200)
                .header( 'Access-Control-Expose-Headers','X-Total-Count')
                .header('x-total-count', response?.length)
                .send(products?.slice(_start,_end));
            }
            return console.log("No arrojo resultados")
        }
        if (q) {
            const response = await productModel.find({'name': new RegExp(q, 'i')}).populate("category");
            console.log(response)
            if (response.flat().length > 0) {
                const products = response?.map((p) => {return formatProduct(p)})
                res.status(200)
                .header( 'Access-Control-Expose-Headers','X-Total-Count')
                .header('x-total-count', response?.length)
                .send(products?.slice(_start,_end));
            }
            console.log("No arrojo resultados")
        }
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
  }

  const getProductById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const response = await productModel.findById(id).populate("category");
      const productF = formatProduct(response)  
      res.status(200).send(productF);
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
      const response = await productModel.findByIdAndDelete(id);  
      res.status(200).json({ deleted: response });
      next();
    } catch (error) {
      console.log(error);
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
        lastPrice,
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
          lastPrice,
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
      const productF = {
        id: editProduct._id,
        sku: editProduct.sku,
        name: editProduct.name,
        price: editProduct.price,
        lastPrice: editProduct.lastPrice,
        weight: editProduct.weight,
        description: editProduct.description,
        image: editProduct.image,
        status: editProduct.status,
        brand: editProduct.brand,
        benchmark: editProduct.benchmark,
        category: editProduct.category?.name,
        createDate: editProduct.create_date,
        stock: editProduct.stock,
      };
      console.log(productF);
      if (productF) {
        res.status(200).send(productF);
        // res.status(200).send("Product Successfully Updated");
      } else res.status(400).send("Product can't be created");
  
      // if (!newProduct) {
      //   res.status(400).send("The New Product can't be created");
      // } else {
      //   res.status(200).send({ msg: "New Product Added", newProduct });
      // }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  const addProduct = async (req, res, next) => {
    console.log("body", req.body)
    try {
      const productData = req.body;
      const {
        sku,
        name,
        price,
        lastPrice,
        weight,
        description,
        image,
        brand,
        benchmark,
        category,
        stock,
      } = productData;
      console.log("image",image)
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
          lastPrice,
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
          res.status(200).send({id: newProduct._id});
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


// Users
const listUsers = async (req, res, next) => {
  const {_start, _end, _sort, _order, q} = req.query
  try {
    if (!q) {
      const response = await userModel.find({})
      if(response.flat().length > 0) {
          const users = response?.map(c => {
              return {
                  id: c._id,
                  full_name: c.full_name,
                  email: c.email,
                  status: c.status,
                  isAdmin: c.isAdmin,
              }
          })
          res.status(200)
          .header( 'Access-Control-Expose-Headers','X-Total-Count')
          .header('x-total-count', response?.length)  
          .send(users?.slice(_start,_end))
      } else {
          res.status(400).send("There's no Users to show right now")
      }
    }
    if (q) {
      const response = await userModel.find({'full_name': new RegExp(q, 'i')})
      if(response.flat().length > 0) {
          const users = response?.map(c => {
              return {
                  id: c._id,
                  full_name: c.full_name,
                  email: c.email,
                  status: c.status,
                  isAdmin: c.isAdmin,
              }
          })
          res.status(200)
          .header( 'Access-Control-Expose-Headers','X-Total-Count')
          .header('x-total-count', response?.length)  
          .send(users?.slice(_start,_end))
      } else {
          res.status(400).send("There's no Users to show right now")
      }
    }
  } catch (error) {
      console.error(error);
      next(error)
  }
}


const addUser = async (req, res, next) => {
  try {
      const categoryData = req.body
      const { full_name, email, password, address, phone, status, isAdmin} = categoryData
      if( full_name && email && password && status) {
          const newUser = await userModel.create({
              full_name,
              email, 
              password,
              address, 
              phone,
              status,
              isAdmin,
          })
          if(!newUser) {
              return res.status(400).send("The New User can't be created")
          } else {
              return res.status(200).send({newUser})
          }
      } else {
          return res.status(400).send("The New User can't be created, missing required data")
      }
  } catch(error) {
      console.error(error);
      next(error)
  }
}

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await userModel.findByIdAndDelete(id);  
    res.status(200).json({ deleted: response });
    next();
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await userModel.findById(id);
    const userF = formatUser(response)  
    res.status(200).send(userF);
    next();
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res, next) => {    // hay que ajustarlo
  console.log("editUser", req.body)
  try {
      const userData = req.body
      const { id, full_name, email, status, isAdmin } = userData
      if( full_name && email) {
          const user = await userModel.findByIdAndUpdate(
              id,
              {
              full_name,
              email,
              status: status,
              isAdmin: isAdmin,
          })
          const userF = formatUser(user)
          console.log(userF)
          return res.status(200).send(userF)
      } else {
          return res.status(400).send(userData)
      }
  } catch(error) {
      console.error(error);
      next(error)
  }
}




// Formats Data
  const formatProduct = (p) => {
    return {
        id: p._id,
        sku: p.sku,
        name: p.name,
        price: p.price,
        lastPrice: p.lastPrice,
        weight: p.weight,
        description: p.description,
        image: p.image,
        status: p.status,
        brand: p.brand,
        benchmark: p.benchmark,
        category: p.category?._id,
        createDate: p.create_date,
        stock: p.stock,
    }
  }

  const formatCategory = (c) => {
    return {
      id: c._id,
      name: c.name,
      description: c.description
    }
  }

  const formatUser = (u) => {
    return {
      id: u._id,
      full_name: u.full_name,
      email: u.email,
      status: u.status,
      isAdmin: u.isAdmin,
    }

  }


module.exports = {
    getProductById,
    editProduct,
    deleteProduct,
    addProduct,
    listProducts,
    listCategory,
    getCategoryById,
    editCategory,
    addCategory,
    deleteCategory,
    listUsers,
    addUser,
    deleteUser,
    getUserById,
    editUser,
  
}