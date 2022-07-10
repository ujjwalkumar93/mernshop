var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        next();
    })
};

exports.getUser = (req, res) => {
    //TODO : get back here
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile)
}

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        { _id : req.profile._id },
        { $set: req.body },
        { new : true, useFindAndModify: false},
        (err, user ) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update the record"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    )
}

exports.userPurchaseOrder = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("User", "_id name")
    .exec((err,order) => {
        if(err){
            return res.status(400)
            .json({
                err: "oder not found"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderinInPurchaseList = (req, res, next) => {
    let purchase = []
    req.body.order.products.forEach(product => {
        purchase.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity : product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
}
