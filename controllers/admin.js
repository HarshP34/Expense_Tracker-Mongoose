const Expense = require('../models/expense');
const User = require('../models/user');
//const DownloadedFiles = require('../model1/filedownloaded');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const { S3 } = require('aws-sdk');

const mongoose=require('mongoose');
const { DATE } = require('sequelize');

exports.addUser = (req, res, next) => {
    console.log('13',req.user);
    const { amount, category, description } = req.body;
    const expense=new Expense({
        amount: amount,
        category: category,
        description: description,
        userId:req.user._id
    })
    
return expense.save()
    .then((result) => {
        console.log('24',result);
        res.status(200).json(result);
    })
        .catch(err => console.log(err));
}


exports.download = async (req, res, next) => {
    try {
        
        // const expenses = await Expenses.find({"userId":req.user._id});
        // const stringifiedExpesnses = JSON.stringify(expenses);
        // const userId = req.user.id;
        // const filename = `Expenses${userId}/${new Date()}.txt`;
        // const fileUrl = await uploadToS3(stringifiedExpesnses, filename);
        // DownloadedFiles.create({ fileUrl: fileUrl, expenseuserId: userId });
        // res.status(200).json({ fileUrl: fileUrl, success: true });
    } catch (err) { res.status(500).json({ fileUrl: '', success: false, error: err }) }
}

function uploadToS3(data, filename) {
    // const BUCKET_NAME = process.env.BUCKET_NAME;
    // const IAM_USER_KEY = process.env.IAM_USER_KEY;
    // const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    // let s3bucket = new AWS.S3({
    //     accessKeyId: IAM_USER_KEY,
    //     secretAccessKey: IAM_USER_SECRET,
    // })
    // var params = {
    //     Bucket: BUCKET_NAME,
    //     Key: filename,
    //     Body: data,
    //     ACL: 'public-read'
    // }

    // return new Promise((resolve, reject) => {
    //     s3bucket.upload(params, (err, s3response) => {
    //         if (err) {
    //             reject(err);
    //             console.log('Something Went Wrong', err)
    //         }
    //         else {
    //             console.log('sucess', s3response)
    //             resolve(s3response.Location);
    //         }
    //     })
    // })

}


exports.getUsers = (req, res, next) => {
        // const page = +req.query.page || 1;
   //  let totalItems;
        // req.user.getExpenses().then((expense) => {
        // }).then().catch(err => console.log(err));
Expense.find({"userId":req.user._id}).then(expenses=>{
        res.status(200).json({
            expenses: expenses, ispremiumuser: false,
    })
 
})
        // req.user.getExpenses({ offset: (page - 1) * ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE }).then(expenses => {
        //     res.status(200).json({
        //         expenses: expenses, ispremiumuser: false,
        //         totalProducts: totalItems,
        //         hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        //         hasPreviousPage: page > 1,
        //         nextPage: page + 1,
        //         previousPage: page - 1,
        //         lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        //     });
        // })
        //     .catch(err => { console.log(err) })

    

}

exports.allUsers = (req, res, next) => {
    if (req.user.ispremiumuser === true) {
        User.findAll({ include: ['expenses'] }).then(users => {
            res.status(200).json(users);
        })
    }

}

exports.deleteUserById = (req, res, next) => {
    const prodId = req.params.id;
    console.log(prodId);
    Expense.findByIdAndRemove(prodId)
        .then(res.status(200).json({ success: true, message: 'Expense deleted' }))
        .catch(err => { console.log(err) })
}

// exports.geteditUser = (req, res, next) => {
//     const prodId = req.params.id;
//     Expense.findByPk(prodId).then((user) => {
//         res.json(user);
//         res.redirect(`/admin/edit-expense`);
//     }).catch(err => console.log(err));
// }


exports.posteditUser = (req, res, next) => {
    const prodId = req.params.id;
    Expense.findById(prodId)
        .then((expense) => {
            expense.amount = req.body.amount;
            expense.category = req.body.category;
            expense.description = req.body.description;
            return expense.save();
        })
        .then((result) => {
            res.json(result);
            console.log('User Edited');
        })
        .catch(err => console.log(err));
}

exports.getSignup = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
}


function generateAccessToken(id, name) {
    return jwt.sign({ expenseuserId: id, name: name }, '4Defl1e5Ghdb8JUys6YZ2jxOrtAhajdJjHgU');
}

exports.postSignup = (req, res, next) => {
    const { name, email, password } = req.body;
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
        try {
            console.log(err);
          const user=new User({
            name:name,
            email:email,
            password:hash,
            isPrime:false,
           })
           user.save();
            res.status(200).json({ success: true, message: 'Successfully Added' });

        } catch (err) { res.status(500).json({ success: false, message: 'Error Occured' }) }
    })
}

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({"email":email})
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err)
                    throw new Error(`Something Went Wrong`);
                if (result === true) {
                    res.status(200).json({ success: true, message: 'User login sucessful', token: generateAccessToken(user[0].id, user[0].name) })
                }
                else {
                    res.status(401).json({ success: false, message: 'User not Authorized' })
                }
            })
        }
        else {
            res.status(400).json({ success: false, message: 'User not Found' })
        }
    }
    catch (err) { res.status(500).json({ success: false, message: `${err}` }) };
}


