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

// Add review
// export const addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;

//     if (!rating || !comment) {
//       return res.status(400).json({ message: 'Rating and comment are required.' });
//     }
//     if (Number(rating) < 1 || Number(rating) > 5) {
//       return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
//     }

//     console.log('req.user:', req.user);
//     const product = await productModel.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const existingReview = product.reviews.find(
//       r => r.user.toString() === req.user._id.toString()
//     );

//     if (existingReview) {
//       existingReview.rating = Number(rating);
//       existingReview.comment = comment;
//     } else {
//       const review = {
//         user: req.user._id,
//         name: req.user.name,
//         rating: Number(rating),
//         comment
//       };
//       product.reviews.push(review);
//     }

//     product.averageRating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();
//     res.status(201).json({ message: 'Review added successfully....', product });
//   } catch (error) {
//     console.error('Add review error:', error);
//     res.status(500).json({ message: 'Server Error....', error: error.message });
//   }
// };
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required.' });
    }

    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Sirf push karo, overwrite ka logic hata do
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);

    product.averageRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    // Updated reviews bhejo
    const updatedProduct = await productModel.findById(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product Not Found...' });
    }
    if (!product.reviews) {
      product.reviews = [];
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error....', error: error.message });
  }
};