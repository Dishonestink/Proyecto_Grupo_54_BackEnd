const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require("cors");



const port = process.env.PORT || 3000;
let db;
let collection;
MongoClient.connect("mongodb+srv://Kevin310805lal:530326311019986412@cluster0.erljt.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('users')
    collection = db.collection('cursos')
})
//Ruta Principal pueden poner una descripcion Rutas: 
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {

  
            res.json({
                Nombre: "API academica",
            });
     

})
app.get('/cursos', (req, res) => {

    db.collection('cursos').find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.get('/cursos/:id', (req, res) => {
    db.collection('cursos').find({id: req.params.id}).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.post('/cursos', (req, res) => {
    collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
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

app.delete('/cursos/:id', (req, res) => {
    collection.deleteOne({ id: req.params.id })
        .then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

app.listen(port, function() {
    console.log('listening on ' + port)
});