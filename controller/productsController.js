const productsService = require('../service/productService');
const {
  UNPROCESSABLE_ENTITY,
  CREATED,
  OK
} = require('../httpsStatus.json');
const { json } = require('body-parser');

const addProduct = async (req, res) => {
  try {
    const { addProduct } = productsService;
    const { name, quantity } = req.body;
  
    const newProduct = await addProduct(name, quantity);

    res.status(CREATED).json(newProduct);
  } catch (error) {
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

const getAllProducts = async (req, res) => {
  const { getAllProducts } = productsService;
  const allProducts = await getAllProducts();
  res.status(OK).json(allProducts);
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { getProductById } = productsService;
    const product = await getProductById(id);
    res.status(OK).json(product);
  } catch (error) {
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        'code': 'invalid_data',
        'message': error.message
      }
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
};