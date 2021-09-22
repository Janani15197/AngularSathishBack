const express = require('express');
const router = express.Router();
const User = require("../Models/user");
const bcrypt =require("bcryptjs");
const jwt =require("JsonWebToken");
const checkAuth = require("../middleware/check-Auth");

// app.use("/api/root",(req,res,next)=>{
//     // console.log("First middleware");
//     // console.log(req.url);
//     // next();
//     const posts=[
//         {id:"101",name:"sathish"},
//         {id:"102",name:"saran"},
//         {id:"103",name:"sam"}
//     ];
    
//     res.status(200).json({posts:posts,Message:'Message fetched successfully'});
// });
// LKgrW0I5TQ7jWiur


router.get('/data',checkAuth,(req,res,next)=>{
    User.find().then(documents=>{
        res.status(200).json({Data:documents,Message:'Message fetched successfully'});
    });
});

router.get('/userdata/:id',checkAuth,(req,res,next)=>{
  User.findById(req.params.id)
  .then(documents=>{
    res.status(200).json({Data:documents,Message:'Message fetched successfully for a particular id'});
  });
});


router.post('/login',(req,res,next)=>{
  let fetchedUser;
  User.findOne({email:req.body.email})
  .then(user=>{
    if(!user){
      return res.status(401).json({message:"User Not Available Please Register!"});  
      }
      fetchedUser=user;
      return bcrypt.compare(req.body.password,user.password);
    
  })
  
  .then(result=>{
    console.log(result)
    if(!result){
      
      return res.status(401).json({message:"Invalid authentication credentials!"
      });  
    }
    const jswt = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
      "secret_should_be_greater_at_all_times",
      {expiresIn:"1hr"})
      return res.status(200).json({
        "token": jswt,
        "expiresIn":3600,
          "userid": fetchedUser._id
      })
  })
  .catch(err=>{
      console.log(err);
    return res.status(401).json(
      {message: "Invalid authentication credentials!"
  })
  });

});
router.post('/Register',(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash =>{
      const users = new User({
        email: req.body.email,
        password : hash,
        first_name :req.body.First_name,
        last_name :req.body.Last_name,
        designation :req.body.Designation,
        division:req.body.Division,
        contactnumber:req.body.contactNumber
      });
     users.save()
      .then(result=>{
        res.status(201).json({
           message:"Added successfully",
           result: result
         }) ;
      })
      .catch(err=>{
          res.status(500).json(
            {message: "Email Already Exists"
        });
      });
    })
});


module.exports = router;
