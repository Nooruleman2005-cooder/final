import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const verifyToken = async (req, res, next) => {
  console.log('Authorization header:', req.headers.authorization);  
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.log('JWT verify error:', err.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};

export default verifyToken