import db from "../infra/db.js";

class ColetaDAO {

    //listar todos as coletas
    static listar() {
        const query = "SELECT * FROM ponto_coleta";
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static buscarPorID(id) {
        const query = "SELECT * FROM ponto_coleta WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(false);
                }
                resolve(row);
            });
        });
    }

    static listarPontosDeColetaPorCnpj(cnpj) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM ponto_coleta WHERE cnpj = ?', [cnpj], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
        });
    });
}



    //INERIR
    static inserir(coleta) {
    const query = "INSERT INTO ponto_coleta (materiais_reciclaveis, horario_funcionamento, endereco, cnpj) VALUES(?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.run(query, [coleta.materiais_reciclaveis, coleta.horario_funcionamento, coleta.endereco, coleta.cnpj], (err) => {
            if (err) {
                reject({
                    mensagem: "Erro ao inserir o ponto de coleta",
                    error: err,
                });
            }
            resolve(coleta);
        });
    });
}


    //ATUALIZAR
    static atualizar(id, coleta) {
    const query =
        "UPDATE ponto_coleta SET materiais_reciclaveis = ?, horario_funcionamento = ?, endereco = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.run(
            query,
            [coleta.materiais_reciclaveis, coleta.horario_funcionamento, coleta.endereco, id],
            (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao atualizar a coleta",
                        erro: err,
                    });
                }
                resolve({
                    mensagem: "coleta atualizado com sucesso"
                });
            }
        );
    });
}

    // DELETE  --  
    static deletar(id) {
    const query = "DELETE FROM ponto_coleta WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.run(query, [id], (err) => {
            if (err) {
                reject({
                    mensagem: "Erro ao deletar a coleta",
                    erro: err,
                });
            }
            resolve({ mensagem: "Coleta deletada com sucesso", id: id });
        });
    });
}

}

export default ColetaDAO