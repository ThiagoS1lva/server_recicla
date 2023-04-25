import SobreDAO from '../DAO/SobreDAO.js'
import Sobre from '../models/Sobre.js'


class SobreController {
    static rotas(app) {
        app.get('/sobre', SobreController.listar)
        app.put('/sobre', SobreController.editar)
    }

    
    // GET - listar registro sobre
    static async listar(req, res) {
        const sobre = await SobreDAO.listarSobre()
        res.status(200).send(sobre)
    }


    // PUT - Editar registros do sobre
    static async editar(req, res) {
        try {const sobre = new Sobre(
            req.body.conteudo
        )
        if (!sobre.conteudo) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        if (!Object.keys(sobre).length) {
            res.status(400).send('O objeto está sem chave')
            return
        }
        const result = await SobreDAO.editar(sobre)
        if (result.erro) {
            res.status(500).send('Erro ao atualizar as informações do campo SOBRE')
            return
        }
        res.status(200).send({ "Mensagem": "Dados atualizados", "Sobre: ": sobre })
    } catch (err) {
        console.log(err)
        res.status(500).send('Erro ao atualizar as informações do campo SOBRE')
    }}
}
export default SobreController;