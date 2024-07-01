const mongoose=require('mongoose');


const paymentSchema =mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    amount: { type: Number, required: true }
  });

  module.exports=mongoose.model("payment",paymentSchema);