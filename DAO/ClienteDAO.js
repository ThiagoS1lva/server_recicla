// Importa o db.js para poder usar o banco de dados simulado
import db from "../infra/db.js" ;
import Cliente from "../models/Cliente.js" ;


// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe coletadorController... Alguns vão dar retorno e para outros, isso não será necessário
class ClienteDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM Cliente";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  
  

  //Buscar por email e senha
  static buscarPorEmailESenha(email, password) {
    const query = "SELECT * FROM Cliente WHERE email = ? AND password = ?";

    return new Promise((resolve, reject) => {
      db.get(query, [email, password], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          const cliente = new Cliente(row.username, row.email, row.password, row.telefone, row.CEP);
          cliente.username = row.username;
          cliente.email = row.email;
          cliente.password = row.password;
          cliente.telefone = row.telefone;
          cliente.cep = row.CEP;
          resolve(cliente);
        }
      })
    })
  }



  // GET  --  
  static buscarPorID(id) {
    const query = "SELECT * FROM Cliente WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  static buscarPorEmail(email) {
    const query = "SELECT * FROM Cliente WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [email], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }


  // POST
  static inserir(cliente) {
    const query = "INSERT INTO Cliente (username, email, password, telefone, CEP) VALUES(?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [cliente.username, cliente.email, cliente.password, cliente.telefone, cliente.cep], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o cliente",
            error: err,
          });
        }
        resolve(cliente);
      });
    });
  }

  // PUT  --  
  static atualizar(email, cliente) {
    const query =
      "UPDATE Cliente SET username = ?, email = ?, password = ?, telefone = ?, CEP = ? WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [cliente.username, cliente.email, cliente.password, cliente.telefone, cliente.cep, email],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o cliente",
              erro: err,
            });
          }
          resolve({
            mensagem: "cliente atualizado com sucesso"
          });
        }
      );
    });
  }

  static atualizarSenha(email, senha) {
    const query = 'UPDATE Cliente SET password = ? WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.run(query, [senha, email],
        (err) => {
          if (err) {
            console.log(err)
            reject({
              mensagem : "Erro ao atualizar a senha",
              erro:err
            });
          }
          resolve({
            mensagem: "cliente atualizado com sucesso"
          })
        })
    })
  }

  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM Cliente WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o cliente",
            erro: err,
          });
        }
        resolve({ mensagem: "Cliente deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
export default ClienteDAO;