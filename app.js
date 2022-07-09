const mongoose = require("mongoose");
const express = require("express");

const app = express();
const router = express.Router()

// middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
// my routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)

mongoose.connect("mongodb://localhost:27017/mernshop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB Connected");
})


const port = 8000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})