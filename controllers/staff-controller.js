import StaffDAO from '../DAO/StaffDAO.js'
import Funcionario from '../models/Funcionario.js'


class StaffController {
    static rotas(app) {
        app.get('/funcionarios', StaffController.listar)
        }

    // GET - listar todos os registros
  static async listar(req, res) {
    try {
      const funcionarios = await StaffDAO.listar()
      res.status(200).json(funcionarios)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Erro ao listar funcionários' })
    }
  }
}
export default StaffController;