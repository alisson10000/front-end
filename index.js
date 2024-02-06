const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');
// Na importação desse modulo o mesmo irá criar a tabela caso a mesma não exista
const postagem = require('./models/Post.js');
const port = 3005

//Configurar passagem do metodo post pelo proprio express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Configurar o handlebars
// Template engine
layoutsDir: __dirname + '/views/layouts',
    //Abaixo foi dada permissão de acesso ao handlebars para visualizar dados do banco de daddos
    //inclusive apresentar os dados no template engine do handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }));

//criação da rota formulário e está redenrizando com o arquivo formulario.handlebars
app.get("/formulario", function (req, res) {
    res.render('layouts/formulario');
});
//criação da rota editar e está redenrizando com o arquivo editar.handlebars
app.get("/editar", function (req, res) {
    res.render('layouts/editar');
});
//criação da rota atualizar e está redenrizando com o arquivo atualizar.handlebars
app.post("/atualizar", function (req, res) {
    id = req.body.id;
    //res.send("valor: " + req.body.id+ req.body.titulo+ req.body.conteudo);


    // a variáve idPOst recebe do formulario o vaor de id para atualizar no banco de dados
    const idPost = req.body.id;
    //postagem é a variável que alem de realizar a conexao com o banco de dados criou a entidade de irá atualizar dados na tabela  
    postagem.update({
        //titulo recebe o valor de name=titulo que vem do formulário
        titulo: req.body.titulo,
        //conteudo recebe o valor de name=conteudo  que vem do formulário da pagina editar handlebars
        conteudo: req.body.conteudo

        // abaixo é a condição para atualização referente id informado pelo usuario
    }, { where: { id: idPost } }).then(function () {
        res.send('Atualizado com sucesso');
        //catch caso a atualização não aconteça ele da a menssagem de erro
    }).catch(function (erro) {
        res.send('Arquivo não atualizado, ' + erro);
    });
nnn});
//abaixo a rota listar vai no banco de dados pega os valores e irá imprimir na pagina listar.handlebars
app.get("/listar", function (req, res) {
    //allowMethods irá permitir que dados sejam apresentado na rederização da página listar.handlebars
    postagem.allowMethods
    // método findAll irá buscar todas as ocorrencias
    postagem.findAll().then(function (posts) {
        res.render('layouts/listar', { p: posts });
    });
});

app.get("/home", function (req, res) {
    res.render('layouts/home');
});
//abaixo a rota salvar irá salvar dados no banco de dados com o que foi informado na rota formulario
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
//configuração final do handlebars como template engine
app.set('view engine', 'handlebars');
//programação para fazer o servidor rodar
app.listen(port, function () {
    console.log(`servidor rodando na porta ${port}`);
});

