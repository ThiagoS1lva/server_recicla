import sqlite3 from 'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database('./database.db');


const CLIENTE_SCHEMA = `
CREATE TABLE IF NOT EXISTS "ponto_coleta" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    materiais_reciclaveis VARCHAR(255) NOT NULL,
    horario_funcionamento VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL
);`;

function criarTabelaCliente () {
    db.run(CLIENTE_SCHEMA, (error) => {
        if (error) console.log("erro ao criar tabela de clientes");
    });
}

db.serialize( () => {
    criarTabelaCliente();
});