const expresso = require('express');
const minhaApi = expresso();
const users = ['test','joao','felipe'];

minhaApi.use(expresso.json());

const porta = 4300

/*
var pessoa = {
    nome : "Felipe Vieira",
    idade : 12,
};
*/

minhaApi.get('/test',(req, res) => {
    let repostaUser = '';
    
    console.log(req.body);
    //res.send('<h1> Hello World!</h1><p>Paragrafo foda</p>');
    //res.send(pessoa);
    for(let user of users){
        repostaUser += '<p>';
        repostaUser += user;
        repostaUser += '</p>';
    }
    res.send(repostaUser);
});

minhaApi.post('/cadastro',(req,res) => {
   // console.log(req.body);
    users.push(req.body.nome);
    res.send();
});

minhaApi.listen(porta, () => {console.log('Minha Primeira API na porta:'+porta)});