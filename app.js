const mongoose = require("mongoose");
const express = require("express");

const app = express();
const router = express.Router()

// middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/auth");
// my routes
app.use("/api",authRoutes)

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