const VoucherModel = require("../models/voucher");
const moment = require("moment");

const index = async (req, res) => { 
  var err;
  const voucher = await VoucherModel.find().sort({cout:-1})
   
  res.render("admin/voucher/voucher",{err,voucher});
};
const create = async (req, res) => { 
  var err;   
    res.render("admin/voucher/add_voucher",{err});
};
const store = async (req, res) => {  

  var err ;
  const {...voucherReq} = req.body;
  const todayDate = new Date().toISOString().slice(0, 10);
  const voucherCodeExisted = await VoucherModel.findOne({code:voucherReq.voucherCode});
  if(voucherCodeExisted!=null){
    err="code bị trùng !";
    res.render("admin/voucher/add_voucher",{err});
  } else if((voucherReq.since <= voucherReq.toDate)&&(voucherReq.since>=todayDate)&&(voucherReq.toDate>=todayDate)){
      const voucher ={
        name:voucherReq.voucherName,
        code:voucherReq.voucherCode,
        type:voucherReq.type,
        quantity:voucherReq.quantity,
        status:voucherReq.status,
        quantityMoney: voucherReq.quantityMoney,
        quantityPercent: voucherReq.quantityPercent,
        quantityMoneyMax: voucherReq.quantityMoneyMax,
        timeStart:moment(voucherReq.since).startOf('day').toDate() ,
        timeEnd: moment(voucherReq.toDate).endOf('day').toDate(),

      }
      await new VoucherModel(voucher).save();
      res.render("admin/voucher/add_voucher",{err});
  } else if((voucherReq.since==voucherReq.toDate)&&(voucherReq.since>=todayDate)&&(voucherReq.toDate>=todayDate)){         
    const voucher ={
      name:voucherReq.voucherName,
      code:voucherReq.voucherCode,
      type:voucherReq.type,
      quantity:voucherReq.quantity,
      status:voucherReq.status,
      quantityMoney: voucherReq.quantityMoney,
      quantityPercent: voucherReq.quantityPercent,
      quantityMoneyMax: voucherReq.quantityMoneyMax,
      timeStart:moment(voucherReq.since).startOf('day').toDate() ,
      timeEnd: moment(voucherReq.toDate).endOf('day').toDate(),

    }
    await new VoucherModel(voucher).save();
    res.render("admin/voucher/add_voucher",{err});
  } else{
    err="Ngày bắt đầu và ngày hết hạn không hợp lệ ";
    res.render("admin/voucher/add_voucher",{err});
  }
};
const edit = async (req, res) => { 
  var err;
  const id = req.params.id;
  const voucher = await VoucherModel.findById(id);

  function nextDayDate(x) {
    var month = x.getMonth() + 1;
    var day = x.getDate();
    var year = x.getFullYear();
    if (month < 10) { month = "0" + month } 
    if (day < 10) { day = "0" + day }
    return year +"-"+ month +"-"+ day;
}
  const timeStart = nextDayDate(voucher.timeStart);
  const timeEnd = nextDayDate(voucher.timeEnd);
  res.render("admin/voucher/edit_voucher",{err,voucher,timeStart,timeEnd});
};
const update = async (req, res) => { 
  var err;
  const {...voucherReq} = req.body;
  const todayDate = new Date().toISOString().slice(0, 10);
  const id  = req.params.id;
  const voucher = await VoucherModel.findById(id);
  function nextDayDate(x) {
    var month = x.getMonth() + 1;
    var day = x.getDate();
    var year = x.getFullYear();
    if (month < 10) { month = "0" + month } 
    if (day < 10) { day = "0" + day }
    return year +"-"+ month +"-"+ day;
}
  const timeStart = nextDayDate(voucher.timeStart);
  const timeEnd = nextDayDate(voucher.timeEnd);
  
  if((voucherReq.since <= voucherReq.toDate)&&(voucherReq.since>=todayDate)&&(voucherReq.toDate>=todayDate)){
    if(voucher.type==voucherReq.type){
      const voucher ={
        name:voucherReq.voucherName,
        code:voucherReq.voucherCode,
        type:voucherReq.type,
        quantity:voucherReq.quantity,
        status:voucherReq.status,
        quantityMoney: voucherReq.quantityMoney,
        quantityPercent: voucherReq.quantityPercent,
        quantityMoneyMax: voucherReq.quantityMoneyMax,
        timeStart:moment(voucherReq.since).startOf('day').toDate() ,
        timeEnd: moment(voucherReq.toDate).endOf('day').toDate(),

      }
      await VoucherModel.updateOne({_id: id}, {$set: voucher});
      res.redirect("/admin/voucher");
    } else{
      if(voucher.type!=voucherReq.type && voucher.type=="Money"&& voucherReq.type=="Percent"){
        
        const voucher ={
          name:voucherReq.voucherName,
          code:voucherReq.voucherCode,
          type:voucherReq.type,
          quantity:voucherReq.quantity,
          status:voucherReq.status,
          quantityMoney: "",
          quantityPercent: voucherReq.quantityPercent,
          quantityMoneyMax: voucherReq.quantityMoneyMax,
          timeStart:moment(voucherReq.since).startOf('day').toDate() ,
          timeEnd: moment(voucherReq.toDate).endOf('day').toDate(),
  
        }
        await VoucherModel.updateOne({_id: id}, {$set: voucher});
        res.redirect("/admin/voucher");
      }
      else{
        const voucher ={
          name:voucherReq.voucherName,
          code:voucherReq.voucherCode,
          type:voucherReq.type,
          quantity:voucherReq.quantity,
          status:voucherReq.status,
          quantityMoney: voucherReq.quantityMoney,
          quantityPercent: "",
          quantityMoneyMax: "",
          timeStart:moment(voucherReq.since).startOf('day').toDate() ,
          timeEnd: moment(voucherReq.toDate).endOf('day').toDate(),
  
        }
        await VoucherModel.updateOne({_id: id}, {$set: voucher});
        res.redirect("/admin/voucher");
      }
    }
      
  }  else{
    err="Ngày bắt đầu và ngày hết hạn không hợp lệ ";
    res.render("admin/voucher/edit_voucher",{err,voucher,timeStart,timeEnd});
  }  
   
};
const dele = async (req, res) => { 
  const id = req.params.id;
  await VoucherModel.deleteOne({_id: id});
  res.redirect("/admin/voucher");
  
};

module.exports = {
  create,
  store,
  index,
  edit,
  update,
  dele
};