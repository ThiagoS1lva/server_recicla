//importando um módulo chamado "index.js" 
import app from './index.js'

// escolhendo a porta em que o servidor será aberto
const port = 3000

// abrindo o servidor na porta escolhida
app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}/`)
})