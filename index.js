const expresso = require('express');
const { status } = require('express/lib/response');
const minhaApi = expresso();

minhaApi.use(expresso.json());minhaApi.use(expresso.json());
const porta = 4300



const funcionarioList = [
    {
        id: 1,
        nome: 'Felipe',
        idade: 18,
        CPF: '10225436734',
        Cargo: 1
    },
    {
        id: 2,
        nome: 'João',
        idade: 18,
        CPF: '10225436734',
        Cargo: 2
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

// Develor uma lista de usuários 
minhaApi.get('/usuarios',(req, res) => {
    let repostaUser = '';

    for(const user of funcionarioList){
        repostaUser += '<p>';
        repostaUser += "Id: "+user.id+"<br>";
        repostaUser += "Nome: "+user.nome+"<br>";
        repostaUser += "Idade: "+user.idade+"<br>";
        repostaUser += "CPF: "+user.CPF+"<br>";
        repostaUser += "Cargo ID: "+user.Cargo+"<br>";
        repostaUser += '</p>\n';
    }
    res.send(repostaUser);
});


//Devolver os dados de um usuário específico pelo seu ID na URL
minhaApi.get('/usuarios/:idUsuario',(req, res) => {
    let repostaUser = '';
    const idUsuario = req.params.idUsuario;

    const objUser = funcionarioList.find(user => parseInt(user.id) === parseInt(idUsuario));
    //console.log(req.body);
    //res.send('<h1> Hello World!</h1><p>Paragrafo foda</p>');
    //res.send(pessoa);
    repostaUser += '<p>';
    repostaUser += "Id: "+objUser.id+"<br>";
    repostaUser += "Nome: "+objUser.nome+"<br>";
    repostaUser += "Idade: "+objUser.idade+"<br>";
    repostaUser += "CPF: "+objUser.CPF+"<br>";
    repostaUser += "Cargo ID: "+objUser.Cargo+"<br>";
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


//Atualizar um usuário pelo ID na URL 
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


// Requisição para deletar um úsuario pelo seu ID na URL
minhaApi.delete('/usuarios/:idUsuario',(req,res) => {
    console.log(req.params.idUsuario);
    const idUsuario = req.params.idUsuario;

    const index = funcionarioList.findIndex(user => parseInt(user.id) === idUsuario);

    funcionarioList.splice(index-1, 1);
    
    res.send();
});

//========================================//
//                CARGO                   //
//========================================//

// Requisição para buscar a lista de cargos
minhaApi.get('/cargos',(req,res) => {
    let cargoInfo = '';

    for(const cargo of cargoList){
        cargoInfo += '<p>';
        cargoInfo += "Codigo: "+cargo.codigo+"<br>";
        cargoInfo += "Nome: "+cargo.nome+"<br>";
        cargoInfo += "Descricao: "+cargo.descricao+"<br>";
        cargoInfo += '</p>\n';
    }
    res.send(cargoInfo);
});


// Requisição para buscar um cargo pelo seu código
minhaApi.get('/cargos/:codCargo',(req, res) => {
    let repostaCargo = '';
    const codCargo = req.params.codCargo;

    
    const objCargo = cargoList.find(cargo => parseInt(cargo.codigo) === parseInt(codCargo));
    if (!objCargo) {
        res.status(500).send();
        return;
    }

    repostaCargo += '<p>';
    repostaCargo += "Codigo: "+objCargo.codigo+"<br>";
    repostaCargo += "Nome: "+objCargo.nome+"<br>";
    repostaCargo += "Descricao: "+objCargo.descricao+"<br>";
    repostaCargo += '</p>\n';
    res.send(repostaCargo);
});

// Requisição para criar um novo cargo
minhaApi.post('/cargos',(req,res) => {
    const maiorID = Math.max(...cargoList.map(({ codigo }) => codigo));
    const objCargo = {codigo: maiorID+1,nome:req.body.nome ,descricao:req.body.descricao};

    cargoList.push(objCargo);
    res.send('Cargo adicionado');
    return;
});

//Atualizar um usuário pelo ID na URL 
minhaApi.put('/cargos/:codCargos',(req,res) => {
    const codCargos = req.params.codCargos;

                                                        // NOME E DESCRIÇÃO
    const novoCargo = {codigo: parseInt(codCargos),nome:req.body.nome ,descricao:req.body.descricao};


    const objCargo = cargoList.find(cargo => parseInt(cargo.codigo) === parseInt(codCargos));
    
    if (objCargo && novoCargo) {
        objCargo.nome = novoCargo.nome;
        objCargo.descricao = novoCargo.descricao;
    }
    res.send();
});


// Requisição para deletar um úsuario pelo seu ID na URL
minhaApi.delete('/cargos/:codCargo',(req,res) => {
    const codCargo = req.params.codCargo;

    const index = cargoList.findIndex(cargo => parseInt(cargo.codigo) === codCargo);
    cargoList.splice(index, 1);
    
    res.send();
});

minhaApi.listen(porta, () => {console.log('Minha Primeira API na porta:'+porta)});