const express = require('express');
const app = express();

const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require("cors");



const port = process.env.PORT || 3000;
let db;
let collection;
let cursoModel = require("./schema") /*Importación del modelo en schema */
mongoose.connect("mongodb+srv://Kevin310805lal:530326311019986412@cluster0.erljt.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log('linea 17'), console.error(err)
    console.log('Connected to Database')
    /*db = client.db('users')
    collection = db.collection('cursos')*/
})

//Ruta Principal pueden poner una descripcion Rutas: 
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.get('/', (req, res) => {
            res.json({
                Nombre: "API academica",
            });
})


app.get('/cursos', (req, res) => {

    cursoModel.find((error,data,next) => 
    {
        if (error) {
            return next(error);
        } else {
            console.log("linea 40")
            console.log(error);
            res.json(data);
     }
    })
        
})

app.get('/cursos/:id', (req, res) => {
    db.collection('cursos').find({id: req.params.id}).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.post('/cursos', (req, res) => { 
    console.log("linea 67");
    console.log(req);
    cursoModel.find({id:parseInt(req.body.id)},function (err, doc) {
        console.log("linea 71")
        console.log(err);
        if (err) {
            console.log("linea 74")
          res.status(422).json(err);
        }
        else {
            console.log("doc[0] impreso");
            console.log(doc[0]);
            if (doc[0]) {
                console.log("linea 81")
                cursoModel.findOneAndUpdate({id:parseInt(req.body.id)}, {
                    $set: {grado: req.body.grado,
                        asignatura: req.body.asignatura, 
                        profesor: req.body.profesor,
                        contenido: req.body.contenido}
                }, err => {
                    if (err) {
                        console.log("linea 89")
                        console.log(err);
                        res.send("Error añadiendo información");
                    } else {
                        console.log("linea 93")
                        res.send("Añadido");
                        cursoModel.find({id:parseInt(req.body.id)},function (err, doc) {
                            console.log(doc[0])
                        })
                    }
                });
            } else {
                console.log("linea 101")
                cursoModel.create(req.body, err => {
                    if (err) {
                        console.log("linea 104")
                        console.log(err);
                        res.send("Error añadiendo información");
                    } else {
                        console.log("linea 108")
                        res.send("Añadido");
                    }
                });
            }
            
        };
    });
})

app.put('/cursos/:id', (req, res) => {
    collection.findOneAndUpdate({ id: req.params.id }, {
            $set: {

                id: req.body.id,
                asignatura: req.body.asignatura,
                profesor: req.body.profesor,
                contenido: req.body.contenido

            }
        }, {
            upsert: true
        }).then(result => { res.json('Updated') })
        .catch(error => console.error(error))

});

app.delete('/cursos', (req,res) => {
    /* collection.deleteOne({ id: req.params.id })
        .then(result => {
            res.json('Deleted')
        })
    .catch(error => console.error(error)) */
    /*console.log("req");
    console.log(req);*/
    console.log("req.body");
    console.log(req.body);
    console.log("req.body.id");
    console.log(req.body.id);
    if (req.body.id) {
        console.log("Existe req.body");
    } else {
        console.log("No existe req.body");
    };
    cursoModel.findOneAndDelete({id:parseInt(req.body.id)},function (err,doc){
        if (err) {
            console.log("linea 136");
            console.log(err);
        } else {
            console.log("linea 139");
            console.log("Curso Eliminado");
        }
    })
});

app.listen(port, function() {
    console.log('listening on ' + port)
});