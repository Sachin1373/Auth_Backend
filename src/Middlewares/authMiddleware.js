import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config({
  path:'./.env'
});

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken; // Get token from HttpOnly cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;