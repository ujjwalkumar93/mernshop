exports.signout = (req,res) => {
    res.json({message: "you are signinup"});
}

exports.signup = (req,res) => {
    console.log("REQ BODY: ", req.body);
    res.json({
        message: "User Signup"
    });
}