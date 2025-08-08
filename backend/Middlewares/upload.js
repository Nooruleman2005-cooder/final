import multer from 'multer';
import pkg from 'multer-storage-cloudinary';
import cloudinary from '../Config/cloudinary.js';

const {CloudinaryStorage} = pkg;

// ************* Define storage engine**************
const storage = new CloudinaryStorage({
    cloudinary : cloudinary, 
    params: {
        folder : 'products',
        allowedFormats : ['jpg', 'jpeg', 'png']
    }
});


// ************ Setup Multer with that storage***********
const upload = multer({storage});

export default upload
