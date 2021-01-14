const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcryptjs');


//User model
const User = require('../models/User')

//Login Page
router.get('/login',(req,res) => {
    res.render('login');
});



//Register Page
router.get('/register',(req,res) => {
    res.render('register');
});


router.post('/register',(req,res) =>{

    // console.log(req.body);
    // res.render(pass);
    const { name, email, password, password2}  = req.body;
    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }
    
      if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
      }
    
      if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
      }
    
      if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
    }else{
      //  res.send('Pass');

      User.findOne({email:email})
      .then(user =>{
        errors.push({ msg:"Email is already registered"});

        if(user){
          res.render('register',{
            errors,
            name,
            email,
            password,
            password2
          });  
        }
        else{
          const newUser = new User({name,email,password});

    //      console.log(newUser);
    //      newUser.save();
   //       res.send('HelloWorld12');

        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
          newUser.save()
          .then(user => {
          req.flash(
            'success_msg',
            'You are now registered and can log in'
          );
          res.redirect('/users/login');
          })
          .catch(err => console.log(err));
        });
        });
        }
      });

 


    }
});


module.exports = router

