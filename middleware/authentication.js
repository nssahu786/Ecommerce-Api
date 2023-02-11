var jwt = require('jsonwebtoken')
const userModel=require('../models/User.js')


var checkUserAuth = async (req, res, next) => {
    //const { token }  = req.cookies;
    const {token} = req.cookies;
    //console.log(token)
    if (!token) {
      res.status(401).send({ status: " FAILED ", message: "UN AUTHORIZED USER, NO TOKEN" })
    }else{
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(decodedData)
  
    req.user = await userModel.findById(decodedData.userid);
    //console.log(req.user.id)
    next()
}
}

var authorizeRoles = (roles) => {
    return (req, res, next) => {
      //console.log(req.user.role)
      if (!roles.includes(req.user.role)) {       
        return res.status(401).send({ status: " FAILED ", message: " YOU ARE NOT ALLOWED TO ACCESS THIS RESOURCE "})   
      }  
      next();
    };
  };

module.exports={
    checkUserAuth,
    authorizeRoles 
}