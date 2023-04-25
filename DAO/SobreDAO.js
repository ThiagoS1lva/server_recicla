import db from "../infra/db.js";


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe coletadorController... Alguns vão dar retorno e para outros, isso não será necessário
class SobreDAO {

  // GET  --  
  static listarSobre() {
    const query = "SELECT * FROM Sobre WHERE id = 1";
    return new Promise((resolve, reject) => {
      db.get(query, (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  // PUT  --  
  static editar(sobre) {
    const query =
      "UPDATE Sobre SET conteudo = ? WHERE id = 1";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [sobre.conteudo],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o SOBRE",
              erro: err,
            });
          }
          resolve({
            mensagem: "SOBRE atualizado com sucesso"
          });
        }
      );
    });
  };

}

export default SobreDAO;