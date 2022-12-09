const express=require('express');

const router=express.Router();

const adminController=require('../controllers/admin');
const Authentication=require('../middleware/auth');

router.post('/expense',Authentication.authentication,adminController.addUser);

 router.get('/expense/:number',Authentication.authentication,adminController.getUsers);

// router.get('/allusers',Authentication.authentication,adminController.allUsers);

// router.get('/download',Authentication.authentication,adminController.download)

 router.post('/edit-expense/:id',Authentication.authentication,adminController.posteditUser);

 //router.get('/edit-expense/:id',Authentication.authentication,adminController.geteditUser);

 router.delete('/delete-expense/:id',Authentication.authentication,adminController.deleteUserById)

 router.post('/user/signup',adminController.postSignup);

 router.get('/user/signup',adminController.getSignup);

router.post('/user/login',adminController.postLogin);

module.exports=router;