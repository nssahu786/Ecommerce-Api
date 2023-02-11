const OrderModel = require('../models/Order')

class ordercontroller{

    static newOrder = async (req, res) => {
        const {
          shippingInfo,
          orderItems,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        } = req.body;
        try {
          const order = await OrderModel.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
          });
          res.status(201).json({
            success: true,
            order,
          });
        } catch (error) {
          console.log(error);
        }
    }
    static getsingleorder = async(req,res) =>{
      try {
          const result = await OrderModel.findById(req.params.id)
          res.status(200).json({ success:true, message:"SUCCESS", result});
        }catch (err) {
          console.log(err)
        }
    }

    static myorder = async(req,res) =>{
      try {
        const result = await OrderModel.find({user: req.user.id})
        res.status(200).json({ success:true, message:"SUCCESS", result});
      }catch (err) {
        console.log(err)
      }
        
    }
    static getallorder = async(req,res) =>{
      try {
        const result = await OrderModel.find()
        res.status(200).json({ success:true, message:"SUCCESS", result});
        }catch (err) {
        console.log(err)
        }
    }
    static deleteorder = async(req,res) =>{
      try{
        const result = await OrderModel.findByIdAndDelete(req.params.id)
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
module.exports = ordercontroller