import ClienteDAO from '../DAO/ClienteDAO.js'
import Cliente from '../models/Cliente.js'


class ClienteController {
    static rotas(app) {
        app.get('/Clientes', ClienteController.listar)
        app.get('/Cliente/id/:id', ClienteController.buscarPorID)
        app.get('/Cliente/email/:email', ClienteController.buscarPorEmail)
        app.post('/Cliente', ClienteController.inserir)
        app.post('/Cliente/login', ClienteController.login)
        app.put('/Cliente/email/:email', ClienteController.atualizaCliente)
        app.put('/Cliente/red/:email', ClienteController.atualizarSenha)
        app.delete('/Cliente/id/:id', ClienteController.deletarCliente)
    }


    // GET para listar todos
    static async listar(req, res) {
        const clientes = await ClienteDAO.listar()
        res.status(200).send(clientes)
    }

    

    // GET para buscar apenas 1 pela ID
    static async buscarPorID(req, res) {
        const cliente = await ClienteDAO.buscarPorID(req.params.id)
        if (!cliente) {
            res.status(404).send("Cliente não encontrado")
            return
        }
        res.status(200).send(cliente)
    }

    // GET para buscar apenas 1 pela EMAIL
    static async buscarPorEmail(req, res) {
        const cliente = await ClienteDAO.buscarPorEmail(req.params.email)
        if (!cliente) {
            res.status(404).send("Cliente não encontrado")
            return
        }
        res.status(200).send(cliente)
    }




    //LOGIN
    static async login(req, res) {
        const { email, password } = req.body

        try {
            const cliente = await ClienteDAO.buscarPorEmailESenha(email, password);

            if (!cliente) {
                res.status(401).send('Email ou senha inválidos');
            } else {
                const token = 'token_de_autenticacao';
                res.cookie('token', token);
                res.send(cliente);
            }
        } catch(err) {
            console.log(err);
            res.status(500).send('Erro ao realizar login');
        }
    }

    // POST - Adicionar 1 coletador
    static async inserir(req, res) {
        const cliente = new Cliente(
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.telefone,
            req.body.cep
        )
        if (!cliente.username || !cliente.email || !cliente.password || !cliente.telefone || !cliente.cep) {
            res.status(400).send("Precisa passar todas as informações")
            return
        }
        const result = await ClienteDAO.inserir(cliente)
        if (result.erro) {
            res.status(500).send(result)
            return
        }
        res.status(201).send({ "Mensagem": "Cliente criado com sucesso", "Novo Cliente: ": cliente })
    }


    // PUT - Editar um coletador
    static async atualizaCliente(req, res) {
        try {
            const cliente = new Cliente(
                req.body.username,
                req.body.email,
                req.body.password,
                req.body.telefone,
                req.body.cep
            )
            if (!cliente || !cliente.username || !cliente.email || !cliente.password || !cliente.telefone || !cliente.cep) {
                res.status(400).send("Precisa passar todas as informações")
                return
            }
            if (!Object.keys(cliente).length) {
                res.status(400).send('O objeto está sem chave')
                return
            }
            const result = await ClienteDAO.atualizar(req.params.email, cliente)
            if (result.erro) {
                res.status(500).send('Erro ao atualizar o cliente')
                return
            }
            res.status(200).send({ "Mensagem": "Dados atualizados", "cliente: ": cliente })
        } catch (err) {
            console.log(err)
            res.status(500).send('Erro ao atualizar o cliente')
        }
    }

    static async atualizarSenha(req, res) {
        try {
            const result = await ClienteDAO.atualizarSenha(req.params.email, req.body.password)
            if (result.erro) {
                res.status(500).send('Erro ao atualizar o cliente')
                return
            }
            res.status(200).send({ "Mensagem": "Dados atualizados" })
        } catch (err) {
            console.log(err)
            res.status(500).send('Erro ao atualizar o cliente')
        }
    }


    // DELETE - Deletar 1 cliente
    static async deletarCliente(req, res) {
        const cliente = await ClienteDAO.buscarPorID(req.params.id)
        if (!cliente) {
            res.status(404).send("cliente não encontrado")
            return
        }
        const result = await ClienteDAO.deletar(req.params.id)
        if (result.erro) {
            res.status(400).send({ 'Mensagem': 'Coletador não deletado' })
            return
        }
        res.status(200).send(result)
    }
}

export default ClienteController

