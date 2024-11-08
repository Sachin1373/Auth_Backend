import express from "express"
import users from "../data/UserData.js"
import authMiddleware from "../Middlewares/authMiddleware.js"

const router = express.Router();

router.get('/userdetails', authMiddleware, async (req, res) => {
    try {
      res.send(users)
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
 export default router;