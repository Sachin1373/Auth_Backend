import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnectDB from "./src/Config/DatabaseConnection.js"
import authRoutes from "./src/Routes/authRoutes.js"
import userRoutes from "./src/Routes/userRoutes.js"
dotenv.config({
    path:'./.env'
})

const app = express();
const PORT = process.env.PORT || 3030;

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

//DB Connection
ConnectDB()


//Server Start
app.listen(process.env.PORT,()=>{
    console.log(`Server is Started at :${process.env.PORT}`);
    
})