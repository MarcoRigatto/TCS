# Riffly API — Etapa 07

API REST construída com Node.js, Express e PostgreSQL. O acesso ao banco fica isolado na camada `repositories`, enquanto controllers, services e routes mantêm suas responsabilidades separadas.

## Requisitos
- Node.js e npm
- PostgreSQL em execução
- Banco `riffly` criado no PostgreSQL

## Configuração inicial do banco
1. Abra o pgAdmin e conecte ao servidor PostgreSQL.
2. Selecione o banco `riffly` e abra o Query Tool.
3. Execute o script `database/etapa-07.sql`. Ele complementa as tabelas `artists` e `songs` criadas na preparação do banco, adicionando os campos usados pela aplicação.

### Modelo de dados
- `artists`: `id` (PK), `name` (único).
- `songs`: `id` (PK), `title`, `artist_id` (FK), `album`, `tuning`, `instrument`, `status`, `genre`, `difficulty`, `link`, `observations`, `tags` (JSONB), `sources` (JSONB), `artwork_url`, `created_at` e `updated_at`.
- Relacionamento: um artista pode possuir várias músicas (1:N); cada música referencia um artista por `artist_id`.
- A exclusão de um artista referenciado por músicas é restringida pela chave estrangeira. A API exclui músicas individualmente.

## Configuração da conexão
1. Copie `.env.example` e renomeie a cópia para `.env`.
2. Abra `.env` e informe a senha definida para o usuário `postgres` em `DB_PASSWORD`.
3. Não compartilhe nem envie o arquivo `.env`; ele contém credenciais locais.

Variáveis disponíveis: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` e `PORT`.

## Instalação e execução
Nesta pasta (`src/backend`), execute:

```bash
npm install
npm start
```

Modo de desenvolvimento:

```bash
npm run dev
```

API: http://localhost:3000  
Verificação de conexão com o banco: http://localhost:3000/api/health

## Endpoints CRUD
| Método | Endpoint | Operação |
|---|---|---|
| GET | `/api/musicas` | Lista músicas e artistas |
| GET | `/api/musicas/:id` | Consulta uma música |
| POST | `/api/musicas` | Cria música e associa/cria o artista |
| PUT | `/api/musicas/:id` | Atualiza os campos enviados |
| DELETE | `/api/musicas/:id` | Exclui uma música |

Exemplo de POST:

```json
{
  "titulo": "Everlong",
  "artista": "Foo Fighters",
  "album": "The Colour and the Shape",
  "afinacao": "Drop D",
  "instrumento": "Guitarra",
  "status": "Aprendendo",
  "genero": "Rock",
  "dificuldade": "Intermediária",
  "tags": ["Rock", "Riff"],
  "fontes": [{ "tipo": "YouTube", "url": "https://www.youtube.com/" }]
}
```

Os campos `titulo` e `artista` são obrigatórios. `tags` e `fontes`, quando enviados, devem ser listas. A API também aceita `title` e `artist` como aliases.

## Persistência e tratamento de erros
As operações são executadas no PostgreSQL por meio do pacote `pg`. A criação e atualização usam transações quando precisam criar ou localizar o artista e gravar a música. Erros de conexão e conflitos de integridade são tratados pelo middleware central.

O frontend utiliza a API para listar, cadastrar, editar e excluir músicas. Os dados deixam de depender do `localStorage` e permanecem no banco após reinicializações.
