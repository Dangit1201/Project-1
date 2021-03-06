const express = require("express");
const router = require('express-promise-router')()

//Goi controllers
const CategoryController = require("../app/controllers/category");
const AdminController = require("../app/controllers/admin");
const ProductController = require("../app/controllers/product");
const SiteContoller = require("../app/controllers/site");
const AuthContoller = require("../app/controllers/auth");
const UserController = require("../app/controllers/user");
const AdvertisementContoller = require("../app/controllers/advertisement");
const OrderController = require("../app/controllers/order");
const BlogController = require("../app/controllers/blog");
const StatisticalController = require("../app/controllers/statistical");
const VoucherController = require("../app/controllers/voucher")


//Goi middlewares
const UploadMiddleware = require("../app/middlewares/upload");
const AuthMiddleware = require("../app/middlewares/auth");
const passport = require("passport")
const passportConfig = require('../app/middlewares/passport');

//login fb and gg
router.get('/auth/google',passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/userinfo.profile",
"https://www.googleapis.com/auth/userinfo.email"]}));
router.get('/auth/facebook',passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),AuthContoller.authFacebook);
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),AuthContoller.authGoogle);
router.get("/secret",passport.authenticate("jwt",{session:false}),AuthContoller.secret)
//===========admin================
router.get("/admin",AuthMiddleware.checkAdmin,AdminController.index);

//===========Category===============
router.get("/admin/categories",AuthMiddleware.checkAdmin,CategoryController.index);
router.get("/admin/categories/create",AuthMiddleware.checkAdmin,CategoryController.create);
router.post("/admin/categories/store",AuthMiddleware.checkAdmin,CategoryController.store);
router.get("/admin/categories/edit/:id",AuthMiddleware.checkAdmin,CategoryController.edit);
router.post("/admin/categories/update/:id",AuthMiddleware.checkAdmin,CategoryController.update);
router.post("/admin/categories/delete/:id",AuthMiddleware.checkAdmin,CategoryController.dele);
router.post("/admin/categories/reorder",AuthMiddleware.checkAdmin,CategoryController.reorder);

//===========User===============
router.get("/admin/users",AuthMiddleware.checkAdmin,UserController.index);
router.get("/admin/users/create",AuthMiddleware.checkAdmin,UserController.create);
router.post("/admin/users/store",AuthMiddleware.checkAdmin,UserController.store);
router.get("/admin/users/edit/:id",AuthMiddleware.checkAdmin,UserController.edit);
router.post("/admin/users/update/:id",AuthMiddleware.checkAdmin,UserController.update);
router.post("/admin/users/delete/:id",AuthMiddleware.checkAdmin,UserController.dele);
/* router.post("/admin/users/search",UserContoller.searchUser);
router.post("/admin/users/searchpagi",UserContoller.searchUserPagi); */

//===========Product===============
router.get("/admin/products",AuthMiddleware.checkAdmin,ProductController.index);
router.get("/admin/products/create",AuthMiddleware.checkAdmin,ProductController.create);
router.post("/admin/products/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),ProductController.store);
router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin,ProductController.edit);
router.post("/admin/products/update/:id",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),ProductController.update);
router.post("/admin/products/delete/:id",AuthMiddleware.checkAdmin,ProductController.dele);
router.get("/testdata",ProductController.test);

//===========commentadmin===============
router.get("/admin/comments",AuthMiddleware.checkAdmin,ProductController.commentindex);
router.post("/admin/comments/delete/:id",AuthMiddleware.checkAdmin,ProductController.commentdele);

//===========advertisement===============
router.get("/admin/advertisements",AuthMiddleware.checkAdmin,AdvertisementContoller.index);
router.get("/admin/advertisements/create",AuthMiddleware.checkAdmin,AdvertisementContoller.create);
router.post("/admin/advertisements/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),AdvertisementContoller.store);
router.get("/admin/advertisements/edit/:id",AuthMiddleware.checkAdmin,AdvertisementContoller.edit);
router.post("/admin/advertisements/update/:id",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),AdvertisementContoller.update);
router.post("/admin/advertisements/delete/:id",AuthMiddleware.checkAdmin,AdvertisementContoller.dele);




//===========Site===============
router.post("/voucher", SiteContoller.voucher);
router.get("/", SiteContoller.home);
router.get("/category-:slug.:id", SiteContoller.category);
router.get("/product-:slug.:id", SiteContoller.product);
router.get("/search", SiteContoller.search);
router.get("/cart", SiteContoller.cart);
router.get("/success", SiteContoller.success);
router.post("/product-:slug.:id", SiteContoller.comment);
router.get("/category", SiteContoller.allCategory);
router.get("/contact", SiteContoller.contact);
router.get("/account", SiteContoller.account);
router.get("/blog", SiteContoller.blog);
router.get("/autocomplete", SiteContoller.autocomplete);
router.post("/searchallcat", SiteContoller.searchAllCat);
router.post("/add-to-cart", SiteContoller.addToCart);
router.get("/del-cart-:id", SiteContoller.delCart);
router.post("/update-cart", SiteContoller.updateCart);
router.get("/checkout",AuthMiddleware.checkUser, SiteContoller.checkout);
router.post("/checkout", SiteContoller.successcheckout);
router.get("/blogdetail/:id", SiteContoller.blogdetail);
router.post("/orderdetail", SiteContoller.orderdetail);//chi ti???t s???n ph???m
router.post("/orderdelete/:id", SiteContoller.orderdelete);//chi ti???t s???n ph???m
router.post("/editif/:id", SiteContoller.editif);
router.post("/editpass/:id", SiteContoller.editpass);
//vnpay
router.get("/vnpay_return", SiteContoller.vnpayreturn);
router.get("/vnpay_ipn", SiteContoller.vnpayipn);


//===========Login and Register===============
router.get("/login",AuthMiddleware.checkLoginUser,AuthContoller.Login);
router.post("/login",AuthMiddleware.checkLoginUser, AuthContoller.postLogin);
router.get("/adminlogin",AuthMiddleware.checkLoginAdmin,AuthContoller.adminLogin);
router.post("/adminlogin",AuthMiddleware.checkLoginAdmin, AuthContoller.adminPostLogin);
router.get("/register", AuthContoller.register);
router.post("/register", AuthContoller.registersuccess);
router.get("/adminlogout", AuthMiddleware.checkAdmin, AuthContoller.adminlogout);
router.get("/logout", AuthContoller.logout);
router.get("/forgetpassword", AuthContoller.forgetpass);
router.post("/forgetpassword", AuthContoller.postFoget);
router.get("/reset/:id", AuthContoller.resetpass);
router.post("/reset/:id", AuthContoller.resetpass2);


//===========Order===============
router.get("/admin/orders"/* ,AuthMiddleware.checkAdmin */,OrderController.index);
router.get("/admin/orders/edit/:id"/* ,AuthMiddleware.checkAdmin */,OrderController.edit);
router.post("/admin/orders/update/:id"/* ,AuthMiddleware.checkAdmin */,OrderController.update);
router.post("/admin/orders/delete/:id",AuthMiddleware.checkAdmin,OrderController.dele);
router.post("/admin/orders/shipping/:id",AuthMiddleware.checkAdmin,OrderController.shipping);

router.get("/admin/ordertransport"/* ,AuthMiddleware.checkAdmin */,OrderController.indextransport);
router.post("/admin/ordertransport/shipping/:id"/* ,AuthMiddleware.checkAdmin */,OrderController.shippinguser);
router.get("/admin/ordertransport/view/:id"/* ,AuthMiddleware.checkAdmin */,OrderController.viewtransport);
router.post("/admin/ordertransport/delete/:id",AuthMiddleware.checkAdmin,OrderController.deletransport);

router.post("/admin/orders/orderconfirmation/:id"/* ,AuthMiddleware.checkAdmin */,OrderController.orderconfirmation);
router.post("/admin/order/print"/* ,AuthMiddleware.checkAdmin */,OrderController.print);
//refund
router.get("/admin/refund"/* ,AuthMiddleware.checkAdmin */,OrderController.refund);
router.post("/admin/orderdetail"/* ,AuthMiddleware.checkAdmin */,OrderController.orderdetail);
router.post("/admin/orderdetail/:id"/* ,AuthMiddleware.checkAdmin */,OrderController.refundsuccess);


//===========statistical===============
router.get("/admin/statisticsbyday",AuthMiddleware.checkAdmin,StatisticalController.byday);
router.post("/admin/statisticsbyday",AuthMiddleware.checkAdmin,StatisticalController.searchbyday);
router.get("/admin/statisticsbytime",AuthMiddleware.checkAdmin,StatisticalController.bytime);
router.post("/admin/statisticsbytime1",AuthMiddleware.checkAdmin,StatisticalController.searchbytime1);
router.post("/admin/statisticsbytime2",AuthMiddleware.checkAdmin,StatisticalController.searchbytime2);
router.get("/admin/statisticsbyprd",AuthMiddleware.checkAdmin,StatisticalController.searchbyprd);


//===========blog===============
router.get("/admin/blogs",AuthMiddleware.checkAdmin,BlogController.index);
router.get("/admin/blogs/create",AuthMiddleware.checkAdmin,BlogController.create);
router.post("/admin/blogs/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),BlogController.store);
router.get("/admin/blogs/edit/:id",AuthMiddleware.checkAdmin,BlogController.edit);
router.post("/admin/blogs/update/:id",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),BlogController.update);
router.post("/admin/blogs/delete/:id",AuthMiddleware.checkAdmin,BlogController.dele);

//===========Discount code===============
router.get("/admin/voucher"/* ,AuthMiddleware.checkAdmin */,VoucherController.index);
router.get("/admin/voucher/create"/* ,AuthMiddleware.checkAdmin */,VoucherController.create);
router.post("/admin/voucher/store"/* ,AuthMiddleware.checkAdmin */,VoucherController.store);
router.get("/admin/voucher/edit/:id"/* ,AuthMiddleware.checkAdmin */,VoucherController.edit);
router.post("/admin/voucher/update/:id"/* ,AuthMiddleware.checkAdmin */,VoucherController.update);
router.post("/admin/voucher/delete/:id"/* ,AuthMiddleware.checkAdmin */,VoucherController.dele);

module.exports = router;
