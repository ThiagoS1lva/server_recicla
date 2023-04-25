// Importando o packages
import express from 'express'
import cors from 'cors'

// instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json());
app.use(cors())

// importando os controllers
import ClienteController from './controllers/cliente-controller.js';
import EmpresaController from './controllers/empresa-controller.js';
import ColetaController from './controllers/coleta-controller.js';
import SobreController from './controllers/sobre-controller.js';
import StaffController from './controllers/staff-controller.js';

ClienteController.rotas(app);
EmpresaController.rotas(app);
ColetaController.rotas(app);
SobreController.rotas(app);
StaffController.rotas(app);

export default app
