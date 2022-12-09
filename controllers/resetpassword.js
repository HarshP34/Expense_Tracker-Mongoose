// const uuid = require('uuid');
// const bcrypt = require('bcrypt');
// const User = require('../model1/user');
// const Forgotpassword = require('../model1/forgotpassword');
// const { where } = require('sequelize');


// exports.forgotpassword = async (req, res, next) => {
//     try {
//         console.log(req.body);
//         const { email } = req.body;
//         const user = await User.findOne({ where: { email: email } });
//         if (user) {
//             const id = uuid.v4();
//             await user.createForgotpassword({ id: id, isActive: true });
//             return res.status(200).json({ message: 'Link to reset your passsword is sent to your mail', success: true })
//         }
//         else {
//             throw new Error('User is not exists');
//         }
//     } catch (err) {
//         console.log(err);
//         return res.json({ message: err, sucess: false })
//     };
// }

// exports.resetpassword = (req, res) => {
//     const id = req.params.id;
//     Forgotpassword.findOne({ where: { id } }).then(forgotpasswordrequest => {
//         if (forgotpasswordrequest) {
//             if (forgotpasswordrequest.isActive === true) {
//                 forgotpasswordrequest.update({ isActive: false });
//                 res.status(200).send(`<html>
//                                         <script>
//                                             function formsubmitted(e){
//                                                 e.preventDefault();
//                                                 console.log('called')
//                                             }
//                                         </script>
//                                         <form action="/password/updatepassword/${id}" method="get">
//                                             <label for="newpassword">Enter New password</label>
//                                             <input name="newpassword" type="password" required></input>
//                                             <button>reset password</button>
//                                         </form>
//                                     </html>`)
//                 res.end()
//             }
//             else {
//                 res.status(200).json('Link is no longer active');
//             }
//         }
//     }).catch(err => {
//         console.log(err);
//     })
// }

// exports.updatepassword = async (req, res, next) => {
//     try {
//         const { newpassword } = req.query;
//         const { resetpasswordid } = req.params;
//         const resetrequest = await Forgotpassword.findOne({ where: { id: resetpasswordid } });
//         const user = await User.findOne({ where: { id: resetrequest.expenseuserId } });
//         if (user) {
//             const saltRounds = 10;
//             bcrypt.genSalt(saltRounds, function (err, salt) {
//                 if (err) {
//                     console.log(err);
//                     throw new Error(err);
//                 }
//                 bcrypt.hash(newpassword, salt, function (err, hash) {
//                     // Store hash in your password DB.
//                     if (err) {
//                         console.log(err);
//                         throw new Error(err);
//                     }
//                     user.update({ password: hash }).then(() => {
//                         res.status(201).json({ message: 'Successfuly update the new password' })
//                         user.getForgotpasswords().then(forgot => {

//                         })

//                     });
//                 });
//             });
//         }
//         else {
//             res.status(404).json({ error: 'User not exists', success: false });
//         }
//     } catch (err) {
//         console.log(err);
//     }


// }