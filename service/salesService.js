const salesModel = require('../model/salesModel');
const productsModel = require('../model/productsModel');
const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');

const INVALID_DATA = 'Wrong product ID or invalid quantity';

const validateQuantity = (quantity) => {
  const MIN_QTD_LENGTH = 1;
  const schema = Joi.object({
    quantity: Joi.number().min(MIN_QTD_LENGTH).required(),
  });

  const { error } = schema.validate({ quantity });
  if (error) {
    // const { details: [{ message }] } = error;
    throw new Error(INVALID_DATA);
  }
};

const validateId = (id) => {
  if (!ObjectId.isValid((id))) {
    throw new Error(INVALID_DATA);
  }
};

const isProductCadastrate = async (id) => {
  const { getProductById } = productsModel;
  const product = await getProductById(id);
  console.log('passou');
  if (!product) {
    throw new Error(INVALID_DATA);
  }
};

const validateProducts = (products) => {
  products.forEach(({ productId, quantity }) => {
    validateId(productId);
    validateQuantity(quantity);
    isProductCadastrate(productId);
  });

};

const validateSaleId = (id) => {
  if (!ObjectId.isValid((id))) {
    throw new Error('Sale not found');
  }
};

const addSale = async (products) => {
  const { addSale } = salesModel;
  validateProducts(products);

  const sale = await addSale(products);
  return sale;
};

const getAllSales = async () => {
  const { getAllSales } = salesModel;
  const sales = await getAllSales();
  return ({
    sales: sales
  });
};

const getSaleById = async (id) => {
  validateSaleId(id);

  const { getSaleById } = salesModel;
  const sale = await getSaleById(id);

  if (!sale) {
    throw new Error('Sale not found');
  }

  return sale;
};

// const updateProduct = async (id, name, quantity) => {
//   validateId(id);
//   validateNameAndQuantity(name, quantity);

//   const { updateProduct } = productsModel;
//   const updatedProduct = await updateProduct(id, name, quantity);
//   return updatedProduct;
// };

// const deleteProduct = async (id) => {
//   validateId(id);

//   const { deleteProduct } = productsModel;
//   const deletedProduct = await deleteProduct(id);
//   return deletedProduct;
// };

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  // updateProduct,
  // deleteProduct
};