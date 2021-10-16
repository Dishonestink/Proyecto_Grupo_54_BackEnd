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
    if (err) return console.error(err)
    console.log('Connected to Database')
    /*db = client.db('users')
    collection = db.collection('cursos')*/
})

//Ruta Principal pueden poner una descripcion Rutas: 
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
            res.json({
                Nombre: "API academica",
            });
})


app.get('/Estudiantes', (req, res) => {

    cursoModel.find((error,data,next) => 
    {
        if (error) {
            return next(error);
        } else {
            console.log(error);
            res.json(data);
     }
    })
        
})

app.get('/Estudiantes/:id', (req, res) => {
    db.collection('Estudiantes').find({id: req.params.id}).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.post('/Estudiantes', (req, res) => { 
    /*collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))*/
    /*let newCurso = new cursoModel();
    newCurso.id = req.body.id;
    newCurso.asignatura = req.body.asignatura;
    newCurso.profesor = req.body.profesor;
    newCurso.contenido = req.body.contenido;
    newCurso.grado = req.body.grado;*/
    console.log(req.body);
    let existe = false;
    cursoModel.find({id:parseInt(req.body.id)},function (err, doc) {
        console.log(err);
        if (err) {
          res.status(422).json(err);
        }
        else {
            console.log("Hola");
            if (doc.data) {
                cursoModel.findOneAndUpdate({id:parseInt(req.body.id)}, {
                    $set: {grado:req.body.grado}
                }, err => {
                    if (err) {
                        console.log(err);
                        res.send("Error añadiendo información");
                    } else {
                        res.send("Añadido");
                    }
                });
            } else {
                cursoModel.create(req.body, err => {
                    if (err) {
                        console.log(err);
                        res.send("Error añadiendo información");
                    } else {
                        res.send("Añadido");
                    }
                });
            }
            
        };
    });
})

app.put('/Estudiantes/:id', (req, res) => {
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

app.delete('/Estudiantes/:id', (req, res) => {
    collection.deleteOne({ id: req.params.id })
        .then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

app.listen(port, function() {
    console.log('listening on ' + port)
});