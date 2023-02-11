const userModel = require('../models/User')
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

cloudinary.config({ 
  cloud_name: 'devqfnm53', 
  api_key: '968295381339864', 
  api_secret: '2YbdKrhVbldVnuWdCTn6BJA_MYA'
});

class usercontroller{
    static Getall = async(req,res) =>{   
      
      try{

        const user = await userModel.find()

        if (!user){

          return res.status((500).json({success: false,message: "FAILED"}))
        }

          res.status(200).json({success: true,message: 'SUCCESSFULLY',user,});

      } catch(error){
          console.log(err)
      }
      
        
    }
    static Register = async(req,res) =>{
        //console.log(req.files.avatar)
        const file = req.files.avatar;
        const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "avatars",
          width: 150,
          crop: "scale"
      })
        //console.log(req.body)
        const {name,email,password,confirmpassword} = req.body;
        const user = await userModel.findOne({email: email});
        //console.log(user)
        if (user) {
            res.send({ status: "failed", message: "THIS EMAIL IS ALREADY REGISTERED 😓" });
          } else {
            if (name && email && password && confirmpassword) {
              if (password === confirmpassword) {
                try {
                  const salt = await bcrypt.genSalt(10);
                  const hashpassword = await bcrypt.hash(password, salt);
                  const result = new userModel({
                    name: name,
                    email: email,
                    password: hashpassword,
                    avatar: {
                      public_id: myCloud.public_id,
                      url: myCloud.secure_url,
                    },
                  });
                  await result.save();
                  res
                    .status(201)
                    .send({ status: "success", message: "REGISTRATION SUCCESSFULLY 😃🍻" });
                } catch (err) {
                  console.log(err);
                }
              } else {
                res.status(200).send({ status: "success", message: "PASSWORD OR CONFIRM PASSWORD DOES NOT MATCH  😓🍻" });
              }
            } else {
                res.send({ status: "success", message: "ALL FIELDS ARE REQUIRED 😃" });
              
            }
          }
    }
    static Login = async(req,res) =>{
        //console.log(req.body)
        try {
            const { email, password } = req.body;
            if (email && password){
                const user = await userModel.findOne({ email: email });
                //console.log(user)
                if (user != null) 
                {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (user.email === email && isMatch) 
                    {
                        const token = jwt.sign({ userid: user._id}, process.env.JWT_SECRET_KEY);
                        res.cookie('token',token)
                        //console.log(token)
                        res.status(200).json({ status: "success", message: "LOGIN SUCCESSFULLY WITH WEB TOKEN 😃🍻", "Token": token, user });
                    } 
                    else 
                    {
                        res.status(401).json({ status: "failed", message: "EMAIL AND PASSWORD DOES NOT MATCH  😓🍻" });
                    }
                } 
                else 
                {
                    res.status(401).json({ status: "failed", message: "YOU ARE NOT A REGISTERED USER 😃" });
                }
            }
            else{
              res.status(401).json({ status: "failed", message: "all feilds are required 😃🍻" });
            }
        }catch (err) {
            console.log(err);
        }
    
    }
    static Logout = async(req,res) =>{
      try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({success: true,message: "LOGGED OUT SUCCESSFULLY",});

    } catch (err) {
        console.log(error)
    }
    }
    static GetUserDetail = async(req,res)=>{

      const user = await userModel.findById(req.user.id)
      res.status(200).json({success: true,status : "sucess", message : 'SUCCESSFULLY'  ,user,});

    }
    static UpdatePassword = async(req,res) =>{
        const { oldPassword, newPassword, confirmPassword } = req.body
        // console.log(req.body);
        if (oldPassword && newPassword && confirmPassword) {
            //console.log(req.params.id);
            const user = await userModel.findById(req.params.id).select("+password");
            // console.log(user);
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            // console.log(isMatch);
            //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
            if (!isMatch) {
                res.send({ status : 400, message : "OLD PASSWORD IS INCORRECT" })
            } else {
                if (newPassword !== confirmPassword) {
                    res.send({ status: "failed", message: "PASSWORD DOES NOT MATCH" })
                } else {
                    //const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(newPassword, 10)
                    //console.log(req.user)
                    await userModel.findByIdAndUpdate(req.params.id, { $set: { password: newHashPassword } })
                    res.send({ status :  "success" , message: "PASSWORD CHANGED SUCCESSFULLY" })
                }
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    }
    static UpdateProfile = async(req,res) =>{
      // console.log(req.params.id)
        // console.log(req.body)
        try{
          const user = await userModel.findById(req.user.id)
          const imageid = user.avatar.public_id;
          //console.log(imageid)
          await cloudinary.uploader.destroy(imageid);
          const file = req.files.avatar;
          const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "avatars",
            width: 150,
            crop: "scale"
          })
          const result = await userModel.findByIdAndUpdate(req.params.id,{
              name:req.body.name,
              email:req.body.email,
              avatar: {
                  public_id: myCloud.public_id,
                  url: myCloud.secure_url,
              },
              
          })
          // console.log(result)
          res.status(200).json({ status: "success", message: "PROFILE UPDATED SUCCESSFULLY" })
        
        }catch(err) 
        {
          console.log(err)
        }
    }
    
    static UpdateUserRole = async(req,res) =>{
      // console.log(req.body);
      try{
        const result = await userModel.findByIdAndUpdate(req.params.id,req.body)
        // console.log(result)
        res.send({ status: "success", message: "YOUR ROLE UPDATED SUCCESSFULLY" })
      
      }catch(err) 
      {
        console.log(err)
      }
    }

    static GetSingleUser = async(req,res) =>{
      const user = await userModel.findById(req.params.id);
      if (!user) {
        res.send({ status: 400, message: "USER DOES NOT EXIST WITH ID" `${req.params.id}` })
      }
        res.status(200).json({success: true,user});
    }
  
}
module.exports = usercontroller