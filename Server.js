import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
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
app.use(cookieParser());
app.use(cors({
    'origin':'https://auth-frontend-wheat.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    'credentials':true
}));

// app.options('*', cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

//DB Connection
ConnectDB()


//Server Start
app.listen(process.env.PORT,()=>{
    console.log(`Server is Started at :${process.env.PORT}`);
    
})