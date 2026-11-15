# Sistema de Inventário de TI

Aplicação de estudos para **controle de equipamentos, funcionários e chamados técnicos**, com interface web e uma API REST construída em Node.js, Express e MySQL.

Este projeto foi criado para praticar operações CRUD, consultas relacionais e integração entre front-end e back-end. **Está em desenvolvimento**.

## Funcionalidades presentes no código

- Cadastro, listagem, atualização e exclusão de equipamentos.
- Cadastro, listagem, atualização e exclusão de funcionários.
- Cadastro, listagem, atualização e exclusão de chamados.
- Consulta de chamados usando `JOIN` entre chamados, funcionários e equipamentos.
- Interface de equipamentos com busca, filtros e paginação no navegador.
- Consultas SQL parametrizadas para operações de inserção, atualização e exclusão.

## Endpoints da API

| Método | Rota | Função |
| --- | --- | --- |
| GET / POST | `/api/equipamentos` | Listar / cadastrar equipamentos |
| PUT / DELETE | `/api/equipamentos/:id` | Atualizar / excluir equipamento |
| GET / POST | `/api/funcionarios` | Listar / cadastrar funcionários |
| PUT / DELETE | `/api/funcionarios/:id` | Atualizar / excluir funcionário |
| GET / POST | `/api/chamados` | Listar / cadastrar chamados |
| PUT / DELETE | `/api/chamados/:id` | Atualizar / excluir chamado |

**Nota:** atualmente o GET de funcionários usa o formato `{ "resultados": [...] }`, enquanto outros GETs retornam arrays diretamente. A padronização da resposta é uma melhoria pendente.

## Tecnologias

- **Back-end:** Node.js, Express e `mysql2`.
- **Banco de dados:** MySQL.
- **Front-end:** HTML, CSS e JavaScript.
- **Testes manuais de requisições:** arquivos na pasta `bruno/`.

## Organização

```text
sistema-inventario-ti/
├── src/
│   ├── server.js       # Rotas e servidor Express
│   └── database.js     # Conexão MySQL
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── bruno/              # Coleção de requisições
├── package.json
└── README.md
```

## Como executar

1. Instale Node.js e MySQL.
2. Clone o repositório e execute `npm install` na pasta raiz.
3. Crie no MySQL o banco `sistema_inventario` e as tabelas `equipamentos`, `funcionarios` e `chamados` com os campos esperados pelas rotas. **Ainda não há arquivo de migração ou schema SQL no repositório.**
4. Configure a conexão local em `src/database.js`. **A configuração de credenciais precisa ser migrada para variáveis de ambiente antes de uso público.**
5. Execute `node src/server.js`. A API escuta em `http://localhost:3000`.
6. Abra `frontend/index.html` no navegador. O JavaScript do front-end faz requisições ao servidor local na porta 3000.

## Próximos passos

- Mover credenciais para variáveis de ambiente e adicionar configuração de exemplo.
- Versionar o schema SQL para facilitar a reprodução do projeto.
- Validar entradas, padronizar respostas e melhorar o tratamento de erros.
- Adicionar testes automatizados, documentação de requisições e instruções de deploy.

**Autor:** Vinicius Silva Torres — estudante de Análise e Desenvolvimento de Sistemas.
