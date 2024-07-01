const jwt=require("jsonwebtoken");
const userModel=require("../models/user-model");

module.exports=async function(req,res,next){
    if(!req.cookies.token){
        req.flash("Error","You need to login first");
        return res.redirect("/");
    }

    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user=await userModel.findOne({email:decoded.email}).select("-password");
        req.user=user;
        return next();
    }catch(err){
        req.flash("Error","Somethig went wrong");
        res.redirect("/");
    }
}