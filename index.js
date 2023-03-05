const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');
const postagem = require('./models/Post.js');


//Configurar passagem do metro post pelo proprio express
// não estou utilizando o body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Configurar o handlebars
// Template engine
layoutsDir: __dirname + '/views/layouts',
    //Abaixo foi dada permissão de acesso ao handlebars para visualizar dados do banco de daddos

    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }));

app.get("/formulario", function (req, res) {
    res.render('layouts/formulario');
});

app.get("/editar", function (req, res) {
    res.render('layouts/editar');



});

app.post("/atualizar", function (req, res) {
id=  req.body.id;
//res.send("valor: " + req.body.id+ req.body.titulo+ req.body.conteudo);

const idPost = req.body.id;
     postagem.update({

         titulo: req.body.titulo,
         conteudo: req.body.conteudo
        
        
        } , {where : {id :1}}).then(function (){
            res.send('Atualizado com sucesso');
        }).catch(function (erro){
            res.send('Arquivo não atualizado, ' + erro);
        });
  

});

app.get("/listar", function (req, res) {
    postagem.allowMethods
    postagem.findAll().then(function (posts) {
        res.render('layouts/listar', { p: posts });
    });
});
app.get("/home", function (req, res) {
    res.render('layouts/home');
});
app.post("/salvar", function (req, res) {
    postagem.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.send('Criado com sucesso');
    }).catch(function (erro) {
        res.send('houve um erro: ' + erro);
    })
});







app.set('view engine', 'handlebars');

app.listen(8081, function () {
    console.log("servidor rodando na porta 8081");
});

