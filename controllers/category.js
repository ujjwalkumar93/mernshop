const Category = require("../models/category")
// const category = require("../models/category")
exports.getCategoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,cate) => {
        if(err){
            return res.status(400).json({
                error: "category not found"
            })
        }
        req.category = cate
        next();
    })
}

exports.createCategory = (req,res) => {
    const category = new Category(req.body)
    category.save((err,category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req,res) => {
    return res.json(req.category)

}
exports.getAllCategory = (req,res) => {
    Category.find().exec((err,categories) => {
        if(err){
            return res.status(400).json({
                error: "No category found in DB"
            });
        }
        res.json(categories);
    })
};

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;

    Category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failled to update category"
            });
        }
        res.json(updatedCategory);
    })    

};

exports.removeCategory = (req,res) => {
    const category = req.category;
    category.remove((err,category) => {
        if(err){
            return res.status(400).json({
                error: "Failled to delete category"
            });
        }
        res.json({
            message: `successfully deleted category ${category}`
        });
    });

   

};
