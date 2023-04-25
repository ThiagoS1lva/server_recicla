import db from "../infra/db.js";


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe coletadorController... Alguns vão dar retorno e para outros, isso não será necessário
class StaffDAO {

  // GET ALL --
  static listar() {
    const query = "SELECT * FROM Staff";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  };
}


// Exporta a classe'
export default StaffDAO;