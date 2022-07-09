const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                "error": "product found by using id"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error : "problem with img"
            })
        }
        // destruction of fields
        const {name, description, price, category, stock} = fields
        console.log("#############")

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock 
        ){
            return res.status(400).json({
                error: "Please enter the value of all fields"
            })
        }

        let product = new Product(fields)

        // handle file here
        if(file.photo){
            if(file.photo.size > 3000000) {
                return res.status({
                    error : "file size is too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contexntType = file.photo.type
        }
        product.save((err, product) => {
            if(err){
                console.log("err is: ",err)
                return res.status(400).json({
                    error : "failed to save product in DB!"
                })
            }
            res.json(product)
        })

    });
};