import mongoose from 'mongoose';
import slugify from 'slugify';

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: false
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imagePublicId: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    averageRating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

productSchema.pre('save', function (next) {
    if (this.isModified('name') && this.name) {
        this.slug = slugify(this.name, { lowercase: true, strict: true });
    }
    next();
});

// Fix OverwriteModelError here too
const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product;
