# Etapa 06 — Backend e API REST

## Objetivo

Implementar o backend do Riffly, permitindo que a aplicação gerencie músicas por meio de uma API REST. Nesta etapa, foi utilizado Node.js com Express e persistência em arquivo JSON, sem integração com banco de dados relacional.

## Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript no servidor.
- **Express:** framework utilizado para estruturar o servidor e as rotas HTTP.
- **JSON:** formato de armazenamento dos dados das músicas nesta etapa.
- **Postman:** ferramenta utilizada para executar e validar as requisições da API.

## Organização do backend

O backend foi organizado em camadas, separando responsabilidades:

- **Routes:** definição dos endpoints e métodos HTTP.
- **Controllers:** recebimento das requisições e envio das respostas.
- **Services:** regras de negócio e validações.
- **Repositories:** acesso e persistência dos dados.
- **Middlewares:** funções intermediárias para tratamento de requisições e erros.
- **Data:** arquivo JSON utilizado para armazenar as músicas.
- **Server:** inicialização da aplicação e servidor HTTP.

## Persistência

Nesta etapa, os registros são armazenados em arquivo JSON (`data/musicas.json`). Essa solução permite testar operações de criação, consulta, atualização e exclusão sem configurar um banco de dados.

A persistência em JSON é uma solução de desenvolvimento para esta etapa. A integração com banco de dados está prevista para uma etapa posterior.

## Endpoints implementados

Todos os endpoints utilizam o prefixo `/api/musicas`.

| Método | Endpoint | Descrição | Resultado esperado |
|---|---|---|---|
| GET | `/api/musicas` | Lista as músicas cadastradas | 200 OK |
| POST | `/api/musicas` | Cria uma música | 201 Created |
| GET | `/api/musicas/:id` | Consulta uma música pelo ID | 200 OK |
| PUT | `/api/musicas/:id` | Atualiza uma música pelo ID | 200 OK |
| DELETE | `/api/musicas/:id` | Exclui uma música pelo ID | 200 OK |
| POST | `/api/musicas` | Testa envio de dados incompletos | 400 Bad Request |
| GET | `/api/musicas/:id` | Testa consulta com ID inexistente | 404 Not Found |

## Testes realizados no Postman

Foram realizados testes para as sete requisições da coleção:

1. **Listar músicas:** verificou o status HTTP 200 e o formato JSON da resposta.
2. **Criar música:** verificou o status HTTP 201, a resposta JSON e os dados da música criada.
3. **Consultar música por ID:** verificou o status HTTP 200, a existência dos dados e a correspondência do ID consultado.
4. **Atualizar música:** verificou o status HTTP 200 e se os dados atualizados foram retornados corretamente.
5. **Excluir música:** verificou o status HTTP 200 e a mensagem de confirmação da exclusão.
6. **Validar dados incompletos:** verificou o status HTTP 400, o formato JSON e a mensagem de validação.
7. **Consultar ID inexistente:** verificou o status HTTP 404, o formato JSON e a mensagem de música não encontrada.

### Resultado

Os testes foram executados no Postman e os testes de validação configurados para cada requisição apresentaram resultado **Passed**.

## Evidências

As capturas de tela dos resultados no Postman devem ser armazenadas em:

`docs/evidencias/etapa-06/`

As evidências incluem as respostas e os resultados dos testes das sete requisições.

## Conclusão

A Etapa 06 implementou um backend para o Riffly com API REST, operações CRUD, organização modular em camadas e persistência em JSON. Os testes realizados no Postman verificaram os casos de sucesso e os erros de validação e de consulta a um registro inexistente.
