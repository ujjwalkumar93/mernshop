const express = require("express")
const router = express.Router()

const {
    isSignedIn,
    isAuthenticated,
    isAdmin
} = require("../controllers/auth")

const {
    getUserById,
    pushOrderinInPurchaseList
} = require("../controllers/user")

const {updateStock} = require("../controllers/product")

const {getOrderById,
    createOrder,
    getAllOrders,
    updateStatus,
    getStatus
} = require("../controllers/order")

//params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

//Atual routes
// create
router.post(
    "order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderinInPurchaseList,
    updateStock,
    createOrder
    )

//read
router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);

//status of order
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getStatus
);

router.put(
    "order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);

//export module
module.exports = router;