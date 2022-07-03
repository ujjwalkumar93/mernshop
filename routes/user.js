var express = require('express');
var router = express.Router();

const {getUserById, getUser, updateUser, userPurchaseOrder} = require("../controllers/user");
const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/auth");
router.param("userId", getUserById)

router.get("/user/:userId",isSignedIn, isAuthenticated,getUser)
router.put("/user/:userId",isSignedIn, isAuthenticated,updateUser)
router.put("/orders/user/:userId",isSignedIn, isAuthenticated, userPurchaseOrder)
// router.get("/users",getAllUsers)
// router.post("/user",getUserById);
module.exports = router;