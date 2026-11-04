const express = require('express');
const database = require('./database');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Sistema de Inventário de TI funcionando!');
});

app.get('/api/equipamentos', (req, res) => {
    database.query('SELECT * FROM equipamentos', (erro, resultados) => {
        if (erro) {
            console.error(erro);
            res.status(500).json({
                erro: 'Erro ao buscar equipamentos'
            });
            return;
        }

        res.json(resultados);
    });
});





app.post('/api/equipamentos', (req, res) => {

const {patrimonio, tipo, marca, modelo, numero_serie, status, localizacao} = req.body;

database.query( 'INSERT INTO equipamentos(patrimonio, tipo, marca, modelo, numero_serie, status, localizacao) VALUES(?, ?, ?, ?, ?, ?, ?)',
 [patrimonio, tipo, marca, modelo, numero_serie, status, localizacao], (erro, resultado) => {
if (erro) { console.error(erro);

res.status(500).json({erro: 'Erro ao cadastrar equipamento'})
return
}
res.status(201).json({mensagem: 'equipamento cadastrado com sucesso', id: resultado.insertId}) 
 

})
}
);

app.put('/api/equipamentos/:id', (req, res) => {

    const id = req.params.id;
    const {patrimonio, tipo, marca, modelo, numero_serie, status, localizacao} = req.body;

    database.query (

        `UPDATE equipamentos
        SET patrimonio = ?, tipo = ?, marca = ?, modelo = ?, numero_serie = ?, status = ?, localizacao = ?
        WHERE id = ?`,

        [patrimonio, tipo, marca, modelo, numero_serie, status, localizacao, id], (erro, resultado) => {

             if (erro) {
                res.status(500).json({
                    erro: 'problema em alterar equipamento'
                });
                return;
            }

            if(resultado.affectedRows === 0){
                res.status(404).json({erro: 'Equipamento não encontrado'})
                return;

            }
            res.status(200).json({mensagem: 'equipamento alterado com sucesso'})

        }



    )



}
);


app.delete('/api/equipamentos/:id', (req, res) => {

    const id = req.params.id;

    database.query(
        `DELETE FROM equipamentos
        WHERE id = ?`,
        [id],
        (erro, resultado) => {

            if (erro) {
                res.status(500).json({
                    erro: 'problema em deletar equipamento'
                });
                return;
            }

            if (resultado.affectedRows === 0) {

                res.status(404).json({erro: 'Equipamento não encontrado'});
                return;
            }


            res.status(200).json({
                mensagem: 'equipamento deletado com sucesso'
            });
        }
    );
});


app.post('/api/funcionarios', (req, res) => {

const {nome, email, telefone, setor} = req.body
database.query(
    'INSERT INTO funcionarios(nome, email, telefone, setor) VALUES(?, ?, ?, ?)', [nome, email, telefone, setor], (erro, resultado) => {

if(erro) {
    console.error(erro)
    res.status(500).json({erro: 'Erro ao cadastrar o funcionario'})
    return
}
    

res.status(201).json({mensagem: 'Funcionario cadastrado com sucesso', id: resultado.insertId })
}
)
});


app.get('/api/funcionarios', (req, res) => {
    database.query(
        'SELECT * FROM funcionarios', (erro,resultados) => {

            if(erro) {

                console.error(erro)
                res.status(500).json({erro: 'Erro ao buscar funcionarios'});
                return
            }

            res.json({resultados})

        }
    )


}
);

app.put('/api/funcionarios/:id', (req, res) => {

    const id = req.params.id;
    const {nome, email, telefone, setor} = req.body;

database.query(

    `UPDATE funcionarios
    SET nome = ?, email = ?, telefone = ?, setor = ?
    WHERE id = ?`,
    [nome, email, telefone, setor, id], (erro, resultado) => {

if(erro) {

    res.status(500).json({erro: 'problema em alterar funcionario'})
    return;
}
    if (resultado.affectedRows === 0) {

        res.status(404).json({erro: 'Funcionario não encontrado'});
        return;
    }



    res.status(200).json({mensagem: 'funcionario alterado com sucesso'})
    }

)

}
)

app.delete('/api/funcionarios/:id', (req, res) => {

    const id = req.params.id;

    database.query(

        `DELETE FROM funcionarios
        WHERE id = ?`,

        [id], (erro, resultado) => {

            if(erro){
                res.status(500).json({erro: 'Problema em deletar funcionario'})
                return;
            };

            if(resultado.affectedRows === 0) {

                res.status(404).json({erro: 'Funcionario não encontrado'});
                return;
            }

            res.status(200).json({mensagem: 'funcionario deletado com sucesso'});
        }

    );



} 
)

app.get('/api/chamados', (req, res) => {
    database.query(`SELECT
            chamados.id,
            funcionarios.nome AS funcionario,
            funcionarios.email,
            funcionarios.telefone,
            funcionarios.setor,
            equipamentos.marca,
            equipamentos.modelo,
            chamados.problema,
            chamados.pedido,
            chamados.status,
            chamados.data_abertura
        FROM chamados
        JOIN funcionarios
            ON chamados.funcionario_id = funcionarios.id
        JOIN equipamentos
            ON chamados.equipamento_id = equipamentos.id`, (erro, resultados) => {
        if (erro) {
            console.error(erro);
            res.status(500).json({
                erro: 'Erro ao buscar chamados'
            });
            return;
        }

        res.json(resultados);
    });
});





app.post('/api/chamados', (req, res) => {

const {funcionario_id, equipamento_id, problema, pedido, status} = req.body;

database.query( 'INSERT INTO chamados(funcionario_id, equipamento_id, problema, pedido, status) VALUES(?, ?, ?, ?, ?)',
 [funcionario_id, equipamento_id, problema, pedido, status], (erro, resultado) => {
if (erro) { console.error(erro);

res.status(500).json({erro: 'Erro ao cadastrar chamado'})
return
}
res.status(201).json({mensagem: 'chamado cadastrado com sucesso', id: resultado.insertId}) 
 

})
}
);


app.put('/api/chamados/:id', (req, res) => {

    const id = req.params.id;
    const {problema, pedido, status} = req.body;

    database.query(

     `UPDATE chamados
     SET problema = ?, pedido = ?, status = ?
     WHERE id = ?`,
     [problema, pedido, status, id], (erro, resultado) => {

        if (erro) {
            res.status(500).json({erro: 'problema para alterar chamado'});
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({erro: 'Chamado não encontrado'});
            return;
        }

        res.status(200).json({mensagem: 'chamado atualizado com sucesso'})
    })  
});

app.delete('/api/chamados/:id', (req, res) => {

const id = req.params.id;

database.query(
`DELETE FROM chamados
WHERE ID = ?
`,
[id], (erro, resultado) => {

if (erro) {
    res.status(500).json({erro: 'Problema em deletar o chamado',
    });
    return
}

if (resultado.affectedRows === 0) {

    res.status(404).json({erro: 'Chamado não encontrado'})
    return
}
 
    res.status(200).json({mensagem: 'Chamado deletado'})
    return;
}
);




}



)



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});