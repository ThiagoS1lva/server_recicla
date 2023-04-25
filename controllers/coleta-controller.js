import ColetaDAO from '../DAO/ColetaDAO.js';
import Coleta from '../models/Coleta.js';

class ColetaController {
    static rotas(app) {
        app.get('/Coletas', ColetaController.listar)
        app.post('/Coleta', ColetaController.inserir)
        app.get('/Coleta/cnpj/:cnpj', ColetaController.listarPontosDeColetaPorCnpj);
        app.put('/Coleta/id/:id', ColetaController.atualizaColeta)
        app.delete('/Coleta/id/:id', ColetaController.deletarColeta)
    }

    //Listar geral
    static async listar(req, res) {
        const coletas = await ColetaDAO.listar()
        res.status(200).send(coletas)
    }


    static async listarPontosDeColetaPorCnpj(req, res) {
        const cnpj = req.params.cnpj;
        const pontosDeColeta = await ColetaDAO.listarPontosDeColetaPorCnpj(cnpj);
        if (!pontosDeColeta) {
            res.status(404).send({ 'Mensagem': 'Coleta não encontrada' })
            return
        }
        res.send(pontosDeColeta);
    };

    // POST - Adicionar 1 coletador
    static async inserir(req, res) {
        const coleta = new Coleta(
            req.body.materiais_reciclaveis,
            req.body.horario_funcionamento,
            req.body.endereco,
            req.body.cnpj
        )
        if (!coleta.materiais_reciclaveis || !coleta.horario_funcionamento || !coleta.endereco || !coleta.cnpj) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await ColetaDAO.inserir(coleta)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "coleta criado com sucesso", "Novo coleta: ": coleta })
    }


    //ATUALIZAR
    static async atualizaColeta(req, res) {
        try {
            const coleta = new Coleta(
                req.body.materiais_reciclaveis,
                req.body.horario_funcionamento,
                req.body.endereco
            )
            if (!coleta.materiais_reciclaveis || !coleta.horario_funcionamento || !coleta.endereco) {
                res.status(400).send("Precisa passar todas as informações")
                return
            }
            if (!Object.keys(coleta).length) {
                res.status(400).send('O objeto está sem chave')
                return
            }
            const result = await ColetaDAO.atualizar(req.params.id, coleta)
            if (result.erro) {
                res.status(500).send('Erro ao atualizar a coleta')
                return
            }
            res.status(200).send({ "Mensagem": "Dados atualizados", "coleta: ": coleta })
        } catch (err) {
            console.log(err)
            res.status(500).send('Erro ao atualizar a coleta')
        }
    }

    // DELETE - Deletar 1 coleta
    static async deletarColeta(req, res) {
        const coleta = await ColetaDAO.buscarPorID(req.params.id)
        if (!coleta) {
            res.status(404).send("coleta não encontrado")
            return
        }
        const result = await ColetaDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'Coleta não deletada' })
            return
        }
        res.status(200).send(result)
    }




}

export default ColetaController