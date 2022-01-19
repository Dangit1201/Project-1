const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const AdvertisementsModel = require("../models/advertisement");
const BlogsModel = require("../models/blog");
const UserModel = require("../models/user");
module.exports = async (req, res, next)=>{

    
    if(req.session.email_user){
        res.locals.usershare = 1;
        const user = await UserModel.findOne({email:req.session.email_user}) ;
        res.locals.avatar =  user.avatar || "https://file.vfo.vn/hinh/2014/5/anh-dai-dien-facebook-15.jpg";
    }else{
        res.locals.usershare = 2;
    }  
    res.locals.categoriesshare = await CategoryModel.find({status:true}).sort({cout:1});
    res.locals.blogshare = await BlogsModel.find().sort({_id:-1}).limit(5);
    res.locals.advertisementsshare = await AdvertisementsModel.find({typeofadv:'banner'}).sort({_id:-1}).limit(8);
    res.locals.FeaturedProductsshare = await ProductModel.find({
        featured: true,
    }).sort({_id: -1}).limit(6);
    res.locals.totalCartItems = await req.session.cart.reduce((total, product)=>total + product.qty, 0);
    const cate = await CategoryModel.find({ status : true });
    const category = await CategoryModel.find({ status : true }).lean().distinct('_id');
    const d=[];
    for (const a of category) {
        for(const b of cate){
            if(a==b.id){
                const c = await ProductModel.findOne({cat_id:a}).countDocuments();
                var e = {};
                e=b;
                e.descriptions= c;
                d.push(b);
            }        
        }
    }
    res.locals.cateShare =d;
    next();
}
