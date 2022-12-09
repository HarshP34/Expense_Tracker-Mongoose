const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isPrime:{
        type:Boolean,
        required:true
    },
   
})


userSchema.methods.addExpense=function(expense)
{
    console.log('30',expense)
  const updatedexpense=[...this.expenses.expense];
  updatedexpense.push(expense)
    this.expenses={expense:updatedexpense};
  return this.save();
 
}

module.exports=mongoose.model('User',userSchema);