const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const orderSchema = mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled","Delivered","Shipped", "processing","Received"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = {Order, ProductCart };