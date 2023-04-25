// Importa o db.js para poder usar o banco de dados simulado
import db from "../infra/db.js";
import Empresa from "../models/Empresa.js";



// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe coletadorController... Alguns vão dar retorno e para outros, isso não será necessário
class EmpresaDAO {

  // GET  --  Função ALL - Retorna todas as linhas. No callback existe o argumento ROWS
  static listar() {
    const query = "SELECT * FROM empresa";
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  // GET  --  
  static buscarPorID(id) {
    const query = "SELECT * FROM empresa WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }

  //Buscar por email
  static buscarPorEmail(email) {
    const query = "SELECT * FROM empresa WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.get(query, [email], (err, row) => {
        if (err) {
          reject(false);
        }
        resolve(row);
      });
    });
  }



  //LOGIN 
  static buscarPorEmailESenha(email, password) {
    const query = "SELECT * FROM empresa WHERE email = ? AND password = ?";

    return new Promise((resolve, reject) => {
      db.get(query, [email, password], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          const empresa = new Empresa(row.nome, row.telefone, row.CNPJ, row.email, row.password);
          empresa.nome = row.nome;
          empresa.telefone = row.telefone;
          empresa.cnpj = row.CNPJ;
          empresa.email = row.email;
          empresa.password = row.password;
          resolve(empresa);
        }
      })
    })
  }


  // POST
  static inserir(empresa) {
    const query = "INSERT INTO empresa (nome, telefone, CNPJ, email, password) VALUES(?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(query, [empresa.nome, empresa.telefone, empresa.cnpj, empresa.email, empresa.password], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao inserir o empresa",
            error: err,
          });
        }
        resolve(empresa);
      });
    });
  }

  // PUT  --  
  static atualizar(cnpj, empresa) {
    const query =
      "UPDATE empresa SET nome = ?, telefone = ?, CNPJ = ?, email = ?, password = ? WHERE CNPJ = ?";
    return new Promise((resolve, reject) => {
      db.run(
        query,
        [empresa.nome, empresa.telefone, empresa.cnpj, empresa.email, empresa.password, cnpj],
        (err) => {
          if (err) {
            reject({
              mensagem: "Erro ao atualizar o empresa",
              erro: err,
            });
          }
          resolve({
            mensagem: "empresa atualizado com sucesso"
          });
        }
      );
    });
  }
  static atualizarSenha(email, senha) {
    const query = "UPDATE empresa SET password = ? WHERE email = ?";
    return new Promise((resolve, reject) => {
      db.run(query,[senha, email],
        (err) => {
          if (err) {
            console.log(err)
            reject({
              mensagem: "Erro ao atualizar o empresa",
              erro: err,
            });
          }
          resolve({
            mensagem: "empresa atualizado com sucesso"
          });
        }
      );
    });
  }


  // DELETE  --  
  static deletar(id) {
    const query = "DELETE FROM empresa WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject({
            mensagem: "Erro ao deletar o empresa",
            erro: err,
          });
        }
        resolve({ mensagem: "empresa deletado com sucesso", id: id });
      });
    });
  }
}


// Exporta a classe
export default EmpresaDAO;
