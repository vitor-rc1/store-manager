const productsModel = require('../model/productsModel');
const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');


const validateNameAndQuantity = (name, quantity) => {
  const MIN_NAME_LENGTH = 5;
  const MIN_QTD_LENGTH = 1;
  const schema = Joi.object({
    name: Joi.string().min(MIN_NAME_LENGTH).required(),
    quantity: Joi.number().min(MIN_QTD_LENGTH).required(),
  });

  const { error } = schema.validate({ name, quantity });
  if (error) {
    const { details: [{ message }] } = error;
    throw new Error(message);
  }
};

const isProductExist = async (name) => {
  const { getProductByName } = productsModel;
  const product = await getProductByName(name);
  if (product) {
    throw new Error ('Product already exists');
  }
};

const validateId = (id) => {
  if (!ObjectId.isValid((id))) {
    throw new Error('Wrong id format');
  }
};

const addProduct = async (name, quantity) => {
  const { addProduct } = productsModel;
  
  await isProductExist(name);
  validateNameAndQuantity(name, quantity);

  const newProduct = await addProduct(name, quantity);
  return newProduct;
};

const getAllProducts = async () => {
  const { getAllProducts } = productsModel;
  const products = await getAllProducts();
  return ({
    products: products
  });
};

const getProductById = async (id) => {
  validateId(id);

  const { getProductById } = productsModel;
  const product = await getProductById(id);
  console.log(product);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  validateId(id);
  validateNameAndQuantity(name, quantity);

  const { updateProduct } = productsModel;
  const updatedProduct = await updateProduct(id, name, quantity);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  validateId(id);

  const { deleteProduct } = productsModel;
  const deletedProduct = await deleteProduct(id);
  return deletedProduct;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};