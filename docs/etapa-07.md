# Etapa 07 — Persistência e CRUD com banco de dados

## Objetivo
Substituir o armazenamento temporário por persistência em banco de dados PostgreSQL, mantendo a API REST e a separação entre as camadas da aplicação.

## Banco escolhido
Foi escolhido o PostgreSQL, banco relacional que permite representar explicitamente o vínculo entre artistas e músicas por meio de chave primária e chave estrangeira. A escolha também mantém a tecnologia prevista para o projeto desde sua proposta.

## Modelo e entidades

### artists
- `id`: identificador primário gerado pelo banco.
- `name`: nome do artista ou banda, obrigatório e único.

### songs
- `id`: identificador primário gerado pelo banco.
- `title`: título da música.
- `artist_id`: chave estrangeira para `artists.id`.
- `album`, `tuning`, `instrument`, `status`, `genre`, `difficulty`, `link`, `observations`.
- `tags` e `sources`: listas armazenadas em JSONB.
- `artwork_url`: endereço da imagem de capa, reservado para uso futuro.
- `created_at` e `updated_at`: datas de criação e atualização.

### Relacionamento
Um artista pode ter várias músicas (1:N). Cada música pertence a um artista por meio de `songs.artist_id`. A chave estrangeira impede referências a artistas inexistentes.

## Arquitetura
A API mantém as camadas existentes:

`Routes → Controllers → Services → Repositories → PostgreSQL`

- Routes definem os endpoints.
- Controllers recebem requisições e devolvem respostas HTTP.
- Services validam os dados e aplicam regras de negócio.
- Repositories concentram os comandos SQL e o acesso ao banco.
- `config/database.js` centraliza o pool de conexões.

Essa organização evita que controllers e services dependam diretamente do driver PostgreSQL.

## Criação e configuração do banco
1. Criar o banco `riffly` no pgAdmin.
2. Criar as tabelas `artists` e `songs` com suas chaves primária e estrangeira.
3. Executar `src/backend/database/etapa-07.sql` no Query Tool para complementar a tabela `songs` com os campos utilizados pelo sistema.
4. Copiar `src/backend/.env.example` para `src/backend/.env` e configurar a senha local do PostgreSQL.
5. Na pasta `src/backend`, executar `npm install` e `npm start`.
6. Verificar `http://localhost:3000/api/health`.

## Operações CRUD
- Create: `POST /api/musicas`; cria/localiza o artista e insere a música.
- Read: `GET /api/musicas` e `GET /api/musicas/:id`; consulta músicas com o nome do artista.
- Update: `PUT /api/musicas/:id`; atualiza os campos informados.
- Delete: `DELETE /api/musicas/:id`; remove a música pelo identificador.

## Validações e erros
A API exige título e artista na criação, valida tipos de campos, listas `tags`/`fontes`, campos permitidos e identificadores numéricos positivos. O middleware central trata registros inexistentes, erros de conexão e conflitos de integridade do banco.

## Persistência
O frontend passou a consumir a API para operações de leitura e escrita. Dessa forma, os registros são armazenados no PostgreSQL e permanecem disponíveis após reiniciar o backend ou o navegador. O arquivo `data/musicas.json` foi preservado no projeto como histórico da etapa anterior, mas não é mais utilizado pelo repositório da API.
