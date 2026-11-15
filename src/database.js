const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '******',
    database: 'sistema_inventario'
});

connection.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao MySQL:', erro.message);
        return;
    }

    console.log('Conectado ao MySQL!');
});

module.exports = connection;
