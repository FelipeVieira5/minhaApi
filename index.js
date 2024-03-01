const expresso = require('express');
const minhaApi = expresso();

minhaApi.use(expresso.json());minhaApi.use(expresso.json());
const porta = 4300


const usersList = [
    {
        id: 1,
        nome: 'Felipe',
        idade: 18,
        CPF: '10225436734'
    },
    {
        id: 2,
        nome: 'João',
        idade: 18,
        CPF: '10225436734'
    }
];


minhaApi.get('/usuarios',(req, res) => {
    let repostaUser = '';
    
    //console.log(req.body);
    //res.send('<h1> Hello World!</h1><p>Paragrafo foda</p>');
    //res.send(pessoa);
    for(const user of usersList){
        repostaUser += '<p>';
        repostaUser += "Id: "+user.id+" - ";
        repostaUser += "Nome: "+user.nome+" - ";
        repostaUser += "Idade: "+user.idade+" - ";
        repostaUser += "CPF: "+user.CPF;
        repostaUser += '</p>\n';
    }
    res.send(repostaUser);
});

minhaApi.post('/usuarios',(req,res) => {
   // console.log(req.body);
   const maiorID = Math.max(...usersList.map(({ id }) => id));
   
   const objUser = {id: maiorID+1,nome:req.body.nome ,idade:req.body.idade, CPF:req.body.cpf};

    usersList.push(objUser);
    res.send('Usuario adicionado');
    return;
});

minhaApi.put('/usuarios/:idUsuario',(req,res) => {
    console.log(req.params.idUsuario);
    const idUsuario = req.params.idUsuario;
    const novoUser = {id: parseInt(idUsuario),nome:req.body.nome ,idade:req.body.idade, CPF:req.body.cpf};


    const objUser = usersList.find(user => parseInt(user.id) === parseInt(idUsuario));

    console.log(objUser);
    console.log(novoUser);

    
    if (objUser && novoUser) {
        objUser.nome = novoUser.nome;
        objUser.idade = novoUser.idade;
        objUser.CPF = novoUser.CPF;

    }
    res.send();
});

minhaApi.listen(porta, () => {console.log('Minha Primeira API na porta:'+porta)});