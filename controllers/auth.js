const User = require("../models/user");
const { check, validationResult } = require('express-validator');
// const expressjwt = require("express-jwt");
const { expressjwt: expressJwt } = require("express-jwt");
//var expressjwt = require("express-jwt");
const dotenv = require('dotenv');
var jwt = require('jsonwebtoken');

exports.signup = (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].message
        })
    }

    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return err.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        res.json(user)
    })
}

exports.signin = (req,res) => {
    const errors = validationResult(req)
    const {email,password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }

    User.findOne({email}, (err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User email does not exists"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and passwor do not match"
            })
        }

        // create token
        const token = jwt.sign({_id: user._id},"ujjwal")

        // put token in cookie
        res.cookie("token",token,{expire: new Date() + 9999});

        // send responce to frontend
        const {_id,name,email,role} = user;
        return res.json({token,user : {_id,name,email,role}})
    })

}

exports.signout = (req,res) => {
    res.clearCookie("token")
    res.json({
        message : "Use signout sucessfully"
    })
}

// protected route

exports.isSignedIn = expressJwt({
    secret: "ujjwal",
    // credentialsRequired : false,
    algorithms: ["HS256"],
    userProperty: "auth"
});

// custom middleware

exports.isAuthenticated = (req,resp,next) => {
    //let cheacker = req.auth & req.profile & req.profile._id === req.auth._id
    let cheacker = String(req.profile._id) === String(req.auth._id)
    if(!cheacker){
        return resp.status(403).json({
            error : "Access Denied"
        })
    }
    next()
}

exports.isAdmin = (req,resp,next) => {
    if(req.profile.role === 0) {
        return resp.status(403).json({
            error: "You are not admin. Access Denied"
        })
    }
    next()
}