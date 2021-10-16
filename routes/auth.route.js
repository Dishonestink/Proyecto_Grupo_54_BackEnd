const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
var randomstring;
var admin = {};
var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var string_length = 24;
var randomstring = '';
//variables globales

mongoose.connect('mongodb+srv://Kevin310805lal:530326311019986412@cluster0.erljt.mongodb.net/users?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

router.route('/').get((req, res) => res.json({name: 'cambio', apellido: 'loren', ide: '2'}));




router.route('/login').post((req,res) => {
  admin = req.body;
  db.collection('administradores').findOne({email:admin.email}, function(err,obj){
    if(!obj){
      res.json({msg: 'Este correo no esta registrado'});
    }
    if(obj && admin.password != obj.password){
      res.json({msg: 'Correo o contraseña incorrecta'})
    }
    if(obj && admin.password === obj.password){
      res.json({well: true});
      db.collection('administradores').findOneAndUpdate({email:obj.email}, {$set:{succes: true}})
      console.log('El usuario '+obj.name+', inicio sesion correctamente!')
    }
  })
})
router.route('/log').post((req,res)=>{
  db.collection('administradores').findOne({succes:true}, function(err,obj){
    if(obj){
      res.json({log:true})
    }
    if(!obj){
      res.json({log:false})
    }
  })
});
router.route('/search').post((req,res)=>{
  admin = req.body;
  console.log(admin)
  db.collection('administradores').findOne({email:admin.email}, function(err, obj){
    if(obj){
      res.json({password:obj.password});
    }
    if(!obj){
      res.json({password:'No existe este correo'});
    }
  })
});
router.route('/register').post((req,res) =>{
    admin = req.body;
    db.collection('administradores').findOne({email:admin.email}, function(err, obj){
      if(obj){
        res.json({correo:true});
      }
      if(!obj){
        res.json({correo:false})
        for (var i=0; i<string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum,rnum+1);
        }
        admin['token'] = randomstring;
        admin['succes'] = false;
        db.collection('administradores').insertOne(admin, function(err, obj){
          if (err) throw err;
          console.log(admin)
        })
        randomstring='';
      }
    })
});

router.route('/buscar/:id').get((req,res) =>{
    modelo.findById(req.params.id,(error,data) => res.json(data));
});

router.route('/joa').get((req,res) => res.send("Joa Mani"));

router.route('/nena/nene/xd').get

module.exports = router;
