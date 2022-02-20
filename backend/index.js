import express from "express";
import mongoose from "mongoose";
import UserRouter from"./routes/user";
import AuthRoute from "./routes/auth";
import ProductRoute from "./routes/product";
import CartRoute from "./routes/cart";
import OrderRoute from "./routes/order";
import StripeRoute from "./routes/stripe";
import cors from "cors"
const app = express()
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 }


//midelwares
 
app.use(cors(corsOptions))
app.use(express.json());
app.use('/auth', AuthRoute)
app.use('/user', UserRouter)
app.use('/product', ProductRoute)
app.use('/cart', CartRoute)
app.use('/order', OrderRoute)
app.use('/checkout', StripeRoute)



//mongodb connection

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() =>
        console.log("Database connected!"))
    .catch(err => console.log(err));

//bacend server connection

app.listen(process.env.PORT||6000,()=>{
  
    console.log("bacend server is running!!")
})