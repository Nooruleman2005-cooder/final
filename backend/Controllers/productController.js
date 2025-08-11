import productModel from '../Models/product.js';

export const createProduct = async (req, res) => {
  try {

    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    const { name, description, price } = req.body;
    const image = req.file;
    const cleanedPrice = Number(String(price).replace(/[^0-9.]/g, '') || 0);
    console.log('⛳ Cleaned Price:', String(price).replace(/[^0-9.]/g, ''));

    if (!image) {
      return res.status(400).json({
        message: 'Image is required ....'
      });
    }
    // ****** New Object for mongodb *****
    const product = new productModel({
      name,
      description,
      price: cleanedPrice,
      imageUrl: image.path,
      imagePublicId: image.filename
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err, 'Product Failed Save....');
    console.error('ERROR DETAILS:', err);
    res.status(500).json({ message: 'Something Went Wrong...', error: err.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.log('Error', err)
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

