import sqlite3 from'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database('./backend/infra/database.db');

// //Processamento de sinal
process.on('SIGINT', () =>
    db.close(() => {
        console.log('Banco de dados encerrado!');
        process.exit(0);
    })
);

export default db;