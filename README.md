# Recicla.ai - Backend e Frontend

Este é o projeto Recicla.ai, um MVP que utiliza React.js, Express, SQLite, Node e React Bootstrap. O objetivo do projeto é permitir o cadastro de usuários e empresas, além de fornecer autenticação de login com verificação de banco de dados.

## Instalação e execução

### Backend

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório em sua máquina local.
3. Execute o comando `npm install` para instalar as dependências.
4. Execute o comando `npm start` para iniciar o servidor backend. Ele será executado na porta 3000.

### Frontend

1. Execute o comando `npm start` para iniciar o servidor frontend. Ele será executado na porta 5173.

## Funcionalidades

- Cadastro de usuários e empresas
- Autenticação de login com verificação de banco de dados

## Padrão de Arquitetura

O backend segue o padrão de arquitetura MVC (Model-View-Controller) e DAO (Data Access Object).

### Modelo

O modelo representa os dados da aplicação e inclui todas as operações de acesso ao banco de dados.

### Visualização

A visualização é responsável pela interface do usuário.

### Controlador

O controlador é responsável por receber as solicitações do usuário, processá-las e enviar as respostas de volta.

### DAO

O DAO é responsável pela comunicação com o banco de dados. Ele contém todos os métodos necessários para realizar operações de CRUD (Create, Read, Update, Delete) no banco de dados.

