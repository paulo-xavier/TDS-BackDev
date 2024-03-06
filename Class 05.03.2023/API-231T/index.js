const dados = require('./dados.json'); 
const express = require('express'); 
const fs = require('fs'); 

const server = express(); 
server.use(express.json());

server.listen(3000, () => {
    console.log('Server working...'); 
});


// Create do CRUD
server.post('/usuarios', (req, res) => {
    const novoUsuario = req.body; 

    if (!novoUsuario.nome || !novoUsuario.idade || !novoUsuario.curso) {
        return res.status(400).json({ 
            mensagem: 'Dados incompletos!!'
        }); 
    
    } else {
        dados.Usuarios.push(novoUsuario); 
        salvarDados(dados) // apaga o json anterior e cria um novo

        return res.status(201).json({
            mensagem: "Dados completos!! Cadastro realizado!!"
        }); 
    }
})



// Read do CRUD
server.get('/usuarios', (req, res) => {
    return res.json(dados.Usuarios)
})



//Update do CRUD 
server.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id); 
    const atualizarUser = req.body; 

    const indiceUsuario = dados.Usuarios.findIndex(usuario => usuario.id === usuarioId);
    
    if (indiceUsuario === -1) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado!!"
        })
    }

    dados.Usuarios[indiceUsuario].nome = atualizarUser.nome || dados.Usuarios[indiceUsuario].nome
    dados.Usuarios[indiceUsuario].idade = atualizarUser.idade || dados.Usuarios[indiceUsuario].idade
    dados.Usuarios[indiceUsuario].curso = atualizarUser.curso || dados.Usuarios[indiceUsuario].curso

    salvarDados(dados)
    
    return res.json({
        mensagem: "Atualização feita com sucesso!!"
    })

})

//Delete do CRUD 
server.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    dados.Usuarios = dados.Usuarios.filter(u => u.id !== id); 

    salvarDados(dados); 

    return res.status(200).json({
        mensagem: "Usuário excluído!!"
    })
})


function salvarDados() {
    fs.writeFileSync(__dirname + "/dados.json", JSON.stringify(dados, null, 2))
}

