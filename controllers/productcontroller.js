const { query } = require('express');
const productModel = require('../models/Product')
const cloudinary = require('cloudinary').v2;
const FeatureController = require('./FeatureController');


cloudinary.config({ 
    cloud_name: 'devqfnm53', 
    api_key: '968295381339864', 
    api_secret: '2YbdKrhVbldVnuWdCTn6BJA_MYA'
  });

class productcontroller{

    static getallproduct = async(req,res) =>{ 
         // console.log(req.params.id);
         try {

            // SPECIAL WORK ON API - 2
            const productCounts = await productModel.countDocuments();
            //console.log(productCounts)

             // PAGINATION - 3
             const resultPerPage = 3;

            const feature = new FeatureController(productModel.find(), req.query).search().filter().pagination(resultPerPage);
            //console.log(req.query)
            const allproducts = await feature.query;

            //const allproducts = await productModel.find();
            //console.log(allproducts);
            res.status(200).json({success:true,message:"SUCCESS",allproducts,productCounts,resultPerPage});
        } catch (err) {
            console.log(err)
        }
    }
    // ADMIN
    static createproduct = async(req,res) =>{
       //console.log(req.files.images)
        //console.log(req.body)
        const file = req.files.images;
        const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "images",
          width: 150,
          crop: "scale"
        });
        //console.log(myCloud)

        const {name, description, price, stock, rating, category} = req.body;

        try{
            
            const result = new productModel({
                name: name,
                description: description,
                price: price,
                stock: stock,
                rating: rating,
                category: category,
                images: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                  },
                });
                await result.save();
                res.status(201).json({success: true, message: "SUCCESSFULLY", result});
                
            }catch(err){
                console.log(err);
            }
    };
    static getproductdetail = async(req,res) =>{
        try {
                const productDetail = await productModel.findById(req.params.id);
                if (!productDetail) 
                {
                    return res.status((500).json({success: false,message: "PRODUCT NOT FOUND"}))
                }
                res.status(200).json({ success: true, message: "SUCCESSFULLY DISPLAYED", productDetail})
            }   catch (err) {
                console.log(err);
            }
    }
    // ADMIN
    static getadminproduct = async(req,res) =>{
        try {
                const result = await productModel.find();
                if (!result) 
                {
                    res.send({success: false,message: "product not found"})
                }
                res.status(201).json({success: true, message: "SUCCESS", result})
        } catch (err) {
            console.log(err);
        }
    }
    // ADMIN PRODUCT UPDATE
    static updateproduct = async(req,res) =>{
        try{
                const result = await productModel.findByIdAndUpdate(req.params.id, req.body);
                res.status(201).json({success: true,message: "PRODUCT UPDATED SUCCESSFULLY",result})
            }catch (err) {
            console.log(err);
            }
    }
    // ADMIN DELETE PRODUCT
    static deleteproduct = async(req,res) =>{
        try{
                const result = await productModel.findByIdAndDelete(req.params.id)
                if (!result) 
                {
                res.send({ status: "FAILED", message: "PRODUCT NOT FOUND" })
                }
                res.status(201).json({ status: true, message: "DELETED SUCCESSFULLY"})
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = productcontroller