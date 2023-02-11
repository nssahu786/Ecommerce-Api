const express = require('express');
const ordercontroller = require('../controllers/ordercontroller');
const productcontroller = require('../controllers/productcontroller');
const usercontroller = require('../controllers/usercontroller');
const router = express.Router()
const{checkUserAuth,authorizeRoles} = require('../middleware/authentication')


router.get('/admin/user/getall',checkUserAuth,authorizeRoles('admin'),usercontroller.Getall)
router.post('/register',usercontroller.Register)
router.post('/login',usercontroller.Login)
router.get('/logout',usercontroller.Logout)
router.get('/me',checkUserAuth,usercontroller.GetUserDetail)
router.post('/updatepassword/:id',usercontroller.UpdatePassword)
router.post('/updateprofile/:id',checkUserAuth,usercontroller.UpdateProfile)
router.post('/updateuserrole/:id',usercontroller.UpdateUserRole)
router.post('/getsingleuser/:id',checkUserAuth,usercontroller.GetSingleUser)


router.get('/products',productcontroller.getallproduct)
router.post('/create',productcontroller.createproduct)
//router.get('/products',checkUserAuth,productcontroller.getallproduct)
//router.post('/create',checkUserAuth,productcontroller.createproduct)
router.get('/productdetail/:id',productcontroller.getproductdetail)
router.get('/adminproduct',checkUserAuth,productcontroller.getadminproduct)
router.post('/updateproduct/:id',checkUserAuth,productcontroller.updateproduct)
router.get('/deleteproduct/:id',checkUserAuth,productcontroller.deleteproduct)


router.post('/order/insert',checkUserAuth,ordercontroller.newOrder)
router.post('/singleorder/:id',checkUserAuth,ordercontroller.getsingleorder)
router.get('/myorder',checkUserAuth,ordercontroller.myorder)
router.get('/getallorder',checkUserAuth,ordercontroller.getallorder)
router.post('/deleteorder/:id',checkUserAuth,ordercontroller.deleteorder)

module.exports = router;