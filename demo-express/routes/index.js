var express = require('express');
var router = express.Router();
// var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log('Connected to Database')
}).catch((e)=>{
  console.log('Error on connecting the database');
})

var userSchema = new mongoose.Schema({
  title : {type : String, required : true},
  content : String,
  author : String
})

var User = mongoose.model('User',userSchema);
// var db = require('monk')('127.0.0.1:27017/test');
// var userData = db.get('user-data')
// var mongodb = require('mongodb').MongoClient;
// var objectId = require('mongodb').ObjectID;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'FormValidation',success : req.session.success, errors : req.session.errors });
//   req.session.errors = null;
// });

// router.get('/test/:id',(req,res,next)=>{
//   res.render('test', {output : req.params.id});
// })

// router.post('/test/submit',(req,res,next)=>{
//   let id = req.body.id;
//   res.redirect('/test/'+id);
// })

// router.post('/submit',(req,res,next)=>{
//   req.check('email','Invalid Email').isEmail();
//   req.check('password','Invalid Password').isLength({min:4}).equals(req.body.confirm_password);
//   var errors = req.validationErrors();
//   if(errors){
//     req.session.errors = errors;
//     req.session.success = false;
//   }
//   else{
//     req.session.success = true;
//   }
//   res.redirect('/');
// })

var url = 'mongodb://127.0.0.1:27017/test';

router.get('/',(req,res,next)=>{
  res.render('index');
})

router.get('/get-data',(req,res,next)=>{

  User.find().lean().then(docs=>{
    res.render('index',{items:docs})
  });
  //let data = []
  // let data = userData.find({});
  // data.then((docs)=>{
  //   res.render('index',{items:docs})
  // })
  
  // mongodb.connect(url,{useUnifiedTopology:true},(err,db)=>{
  //   assert.equal(null,err);
  //   let dbo = db.db('test');
  //   let cursor = dbo.collection('user-data').find();
  //   cursor.forEach((doc,err) => {
  //     assert.equal(null,err);
  //     data.push(doc);
  //   },()=>{
  //     res.render('index',{items : data})
  //   });
  // })
});

router.post('/insert',(req,res,next)=>{
  var data = {
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  }

  var UserData = new User(data);
  UserData.save();

  // userData.insert(data);
  // mongodb.connect(url,{useUnifiedTopology:true},(err,db)=>{
  //   assert.equal(null,err);
  //     let dbd = db.db('test')
  //     dbd.collection('user-data').insertOne(data,(err,db)=>{
  //     assert.equal(null,err);
  //     console.log('item inserted');
  //   })
  // })
  res.redirect('/');
})

router.post('/update',(req,res,next)=>{
  var data = {
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  }
  var id =  req.body.id;
  User.findById(id,(err,data)=>{
    if(err){
      console.log('Error on Doc Update');
    }
    data.title = req.body.title;
    data.content = req.body.content;
    data.author = req.body.author
    data.save();
  })
  // userData.update({"_id" : id},{$set:data});
  // mongodb.connect(url,{useUnifiedTopology:true},(err,db)=>{
  //   assert.equal(null,err);
  //     let dbd = db.db('test')
  //     dbd.collection('user-data').updateOne({'_id':objectId(id)},{$set:data},(err,db)=>{
  //     assert.equal(null,err);
  //     console.log('item Updated');
  //   })
  // })
  res.redirect('/');
})

router.post('/delete',(req,res,next)=>{
  var data = {
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  }
  var id =  req.body.id;
  User.findByIdAndRemove(id).exec();
  // userData.remove({"_id":id});
  // mongodb.connect(url,{useUnifiedTopology:true},(err,db)=>{
  //   assert.equal(null,err);
  //     let dbd = db.db('test')
  //     dbd.collection('user-data').deleteOne({'_id':objectId(id)},(err,db)=>{
  //     assert.equal(null,err);
  //     console.log('item deleted');
  //   })
  // })
  res.redirect('/')
})
module.exports = router;
