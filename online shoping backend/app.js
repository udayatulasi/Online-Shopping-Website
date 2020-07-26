require('dotenv').config();

const mongoose = require('mongoose');
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth/auth")    
const userRoutes = require("./routes/user/user")
const categoryRoutes = require("./routes/category")
const ProductRoutes = require("./routes/product")
const OrderRoutes = require("./routes/order")
// DB connect

mongoose.connect(process.env.DATABASE,
{useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true,
}
).then(()=>{
    console.log("DB connected")
})


// middleware
app.use(bodyParser.json());
app.use(cookieParser( ));
app.use(cors());


// routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",ProductRoutes)
app.use("/api",OrderRoutes)



// port
const port =  process.env.PORT || 8000;


// starting a server
app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})