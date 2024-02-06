const db = require('./db');
const Post = db.sequelize.define('postagens',
{
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type:  db.Sequelize.TEXT
    }
});
 //Post.sync({force : true}); nesse modelo ao reiniciar o servidor ele apaga e recria a tabela
 Post.sync({})// nesse modelo ele so cria a tabela a primeira vez.
module.exports = Post;
//Executar esse comando uma vez

