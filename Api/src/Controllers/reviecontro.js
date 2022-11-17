const { Router } = require("express");
const axios = require("axios");
const { reviewModel, productModel } = require('../Models/index')
const router = Router();
module.exports = router;

router.post("/add", async (req, res) => {
  const { product_id, full_name, description, stars } = req.body;
  try {
    if (user.status === false) return res.send("User cant comment");
    const review = await reviewModel.create({
      product_id,
      full_name,
      description,
      stars,
    });
    res.send(review);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



router.get("/", async (req, res) => {
  const { product } = req.query;
  console.log('review back', product)
  try {
    /////////////////////
    const reviews = await reviewModel.findById(
      product,
    ).populate({
      path:'user_id',
      select:'id full_name'
    })
    res.send(reviews);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const reviews = await reviewModel.find({ });
    res.send(reviews);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});




// Crear ruta para crear/agregar Review listo
// Crear Ruta para obtener todas las reviews de un producto. listo
// Crear ruta para Modificar Review listo
// Crear Ruta para ocultar review listo
