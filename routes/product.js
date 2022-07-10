const express = require("express")
const router = express.Router()

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategory} = require("../controllers/product")

router.param("userId", getUserById)
router.param("productId", getProductById)

router.post("/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
);
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo);

// delete route
router.delete("product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
)

// update route
router.delete("product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
)

// listing route
router.get("/products", getAllProducts)

// list distinct category
router.get("/products/categories", getAllUniqueCategory)

module.exports = router;