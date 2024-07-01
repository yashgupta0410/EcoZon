const userModel=require("../models/user-model");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {generateToken}=require("../utils/generateToken");




module.exports.registerUser=async function(req,res){
    try{
        let {email,password,fullname,contact}=req.body;

        let user=await userModel.findOne({email:email});
        if(user){
            return res.status(401).render('index', { error: "You already have an account, please login" });
        }

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err){
                    return res.render('index', { error: err.message });
                }
                else{
                    let user=await userModel.create({
                    email,
                    password:hash,
                    fullname,
                    contact
                });
    
                let token=generateToken(user);
                res.cookie("token",token);
                // res.send("user created successfully");
                res.redirect("/shop");

            }
            })
        })
    }catch(err){
        res.render('index', { error: "An error occurred, please try again" });
    }
}

module.exports.loginUser=async function(req,res){
    let {email,password} =req.body;
    let user=await userModel.findOne({email:email});

    if(!user){
        return res.render('index', { error: "Email or Password Incorrect" });
    }
    
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            //res.send("You can login");
            res.redirect("/shop");
        }
        else{
            return res.render('index', { error: "Email or Password Incorrect" });
        }
    })
};

module.exports.logoutUser=function(req,res){
    res.cookie("token","");
    res.redirect("/");
};