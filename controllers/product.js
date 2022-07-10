const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs");
const { set, sortBy } = require("lodash");
const product = require("../models/product");

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
};

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

exports.getProduct = (req, res) => {
    req.photo = undefined;
    return res.json(req.product)
};

exports.photo = (req, res, next) => {
    if(req.product.photo){
        res.set("Content-type", req.product.photo)
        return set.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct = (req, res) => {
    let product = req.product
    product.remove((err, deleteProduct) => {
        if(err){
            error : "failed to delete the product"
        }
        res.json({
            message : "deletion was success",
            deleteProduct
        })
    })

}

exports.updateProduct = (req, res) => {
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

        
        // updateion file here
        let product = req.product
        product = _.extend(product, fields)
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
                    error : "updation of product failed in DB!"
                })
            }
            res.json(product)
        })

    });
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? rparseInt(eq.query.limit)  : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo") // -ve sign is for to not select photo, even we can pass list of field name
    .populate("category")
    .limit(limit)
    .sort([[sortBy, sortBy]])
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "something went wrong"
            })
        }
        res.json(products)
    })
};

exports.updateStock = (req, res, next) => {
    let myOperation = req.body.products.map(prod => {
        return {
            updateOne : {
                filter : {_id: prod._id},
                update: {$inc: {stock: -prod.count,sold: +prod.count}}
            }
        }
    })
    product.bulkWrite(myOperation,{}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operation get failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategory = (req, res) => {
    Product.distinct("category", {}, (error, category) => {
        if(err){
            return res.status(400).json({
                error: "category not found"
            })
        }
        res.json(category)
    })
}