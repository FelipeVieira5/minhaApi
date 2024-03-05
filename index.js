const expresso = require('express');
const minhaApi = expresso();

minhaApi.use(expresso.json());minhaApi.use(expresso.json());
const porta = 4300



const funcionarioList = [
    {
        id: 1,
        nome: 'Felipe',
        idade: 18,
        CPF: '10225436734',
        Cargo: undefined
    },
    {
        id: 2,
        nome: 'João',
        idade: 18,
        CPF: '10225436734'
    }
];

const cargoList = [
    {
        codigo: 1,
        nome:"Zelador",
        descricao:"Faz limpeza na empresa."
    },
    {
        codigo: 2,
        nome:"Programador",
        descricao:"Conserta impressoras"
    }
]

minhaApi.get('/usuarios',(req, res) => {
    let repostaUser = '';
    
    //console.log(req.body);
    //res.send('<h1> Hello World!</h1><p>Paragrafo foda</p>');
    //res.send(pessoa);
    for(const user of funcionarioList){
        repostaUser += '<p>';
        repostaUser += "Id: "+user.id+" - ";
        repostaUser += "Nome: "+user.nome+" - ";
        repostaUser += "Idade: "+user.idade+" - ";
        repostaUser += "CPF: "+user.CPF;
        repostaUser += '</p>\n';
    }
    res.send(repostaUser);
});

minhaApi.get('/usuarios/:idUsuario',(req, res) => {
    let repostaUser = '';
    const idUsuario = req.params.idUsuario;

    const objUser = funcionarioList.find(user => parseInt(user.id) === parseInt(idUsuario));
    //console.log(req.body);
    //res.send('<h1> Hello World!</h1><p>Paragrafo foda</p>');
    //res.send(pessoa);
    repostaUser += '<p>';
    repostaUser += "Id: "+objUser.id+" - ";
    repostaUser += "Nome: "+objUser.nome+" - ";
    repostaUser += "Idade: "+objUser.idade+" - ";
    repostaUser += "CPF: "+objUser.CPF;
    repostaUser += '</p>\n';
    res.send(repostaUser);
});


minhaApi.post('/usuarios',(req,res) => {
   // console.log(req.body);
   const maiorID = Math.max(...funcionarioList.map(({ id }) => id));
   
   const objUser = {id: maiorID+1,nome:req.body.nome ,idade:req.body.idade, CPF:req.body.cpf};

    funcionarioList.push(objUser);
    res.send('Usuario adicionado');
    return;
});

minhaApi.put('/usuarios/:idUsuario',(req,res) => {
    console.log(req.params.idUsuario);
    const idUsuario = req.params.idUsuario;
    const novoUser = {id: parseInt(idUsuario),nome:req.body.nome ,idade:req.body.idade, CPF:req.body.cpf};


    const objUser = funcionarioList.find(user => parseInt(user.id) === parseInt(idUsuario));

    console.log(objUser);
    console.log(novoUser);

    
    if (objUser && novoUser) {
        objUser.nome = novoUser.nome;
        objUser.idade = novoUser.idade;
        objUser.CPF = novoUser.CPF;

    }
    res.send();
});


minhaApi.delete('/usuarios/:idUsuario',(req,res) => {
    console.log(req.params.idUsuario);
    const idUsuario = req.params.idUsuario;

    const index = funcionarioList.findIndex(user => parseInt(user.id) === idUsuario);

    funcionarioList.splice(index-1, 1);
    
    res.send();
});

minhaApi.get('/cargos',(req,res) => {
    let cargoInfo = '';
    
    //console.log(req.body);
    //res.send('<h1> Hello World!</h1><p>Paragrafo foda</p>');
    //res.send(pessoa);
    for(const cargo of cargoList){
        cargoInfo += '<p>';
        cargoInfo += "Codigo: "+cargo.codigo+" - ";
        cargoInfo += "Nome: "+cargo.nome+" - ";
        cargoInfo += "Descricao: "+cargo.descricao+" - ";
        cargoInfo += '</p>\n';
    }
    res.send(cargoInfo);
});

minhaApi.post('/cargos',(req,res) => {
    const maiorID = Math.max(...cargoList.map(({ codigo }) => codigo));
    const objCargo = {codigo: maiorID+1,nome:req.body.nome ,descricao:req.body.descricao};

    cargoList.push(objCargo);
    res.send('Usuario adicionado');
    return;
});

minhaApi.listen(porta, () => {console.log('Minha Primeira API na porta:'+porta)});