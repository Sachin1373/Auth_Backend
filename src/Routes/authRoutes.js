import express from 'express'
import User from '../Modals/User.js'
import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
})

const router = express.Router();

//SignUp route
router.post('/signup', async(req,res)=>{
    const {name,email,password} = req.body;

    try {
        const UserExist =  await User.findOne({email})
        if(UserExist){
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const HashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ name, email, password: HashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error("SignUp Error",error);
        res.status(500).json({ message: 'Server error' });
    }
})

//Login route
router.post('/login', async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log(token);
        
        res.json({token});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });    
    }
})

export default router;