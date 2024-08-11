import ProductModel from '../models/productModel.js';

export const addProduct = async (req, res) => {
  const products = await ProductModel.find({});
  let id;
  if (products.length > 0) {
    let last_product = products.slice(-1);
    id = last_product[0].id + 1;
  } else {
    id = 1;
  }

  const product = new ProductModel({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  try {
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: product,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const removeProduct = async (req, res) => {
  const id = req.body.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const listAllProdcuts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find({});
    res.status(200).json({
      success: true,
      message: 'All products fetched successfully',
      data: allProducts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const newCollections = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    const newCollections = products.slice(-8);
    res.status(200).json({
      success: true,
      message: 'new collections fetched successfully',
      data: newCollections,
      error: false,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', error: true });
  }
};

export const popular = async (req, res) => {
  try {
    const products = await ProductModel.find({ category: 'women' });
    const popularProducts = products.slice(0, 4);
    res.status(200).json({
      success: true,
      message: 'popular products fetched successfully',
      data: popularProducts,
      error: false,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', error: true });
  }
};

export const relatedProducts = async (req, res) => {
  const category = req.body.category;
  console.log(category);
  try {
    const products = await ProductModel.find({ category });
    const relatedProducts = products.slice(0, 4);
    res.status(200).json({
      success: true,
      message: 'related products fetched successfully',
      data: relatedProducts,
      error: false,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', error: true });
  }
};
