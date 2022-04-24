const mongoose = require("mongoose");
const express = require("express");

const app = express();

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