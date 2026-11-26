# Riffly — Organize. Practice. Play.

Aplicação web para organizar repertório musical, fontes de tablatura e acompanhar o aprendizado.

## Executar no Windows

1. Extraia a pasta completa do projeto.
2. Execute `INICIAR_RIFFLY.bat`.
3. O navegador abrirá em `http://127.0.0.1:8000/index.html`.
4. Mantenha a janela do servidor aberta enquanto utiliza a aplicação.

Também é possível abrir um terminal em `src/frontend` e executar:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Depois, acesse `http://127.0.0.1:8000/index.html`.

> O servidor local é necessário para servir os módulos JavaScript ES e permitir que o navegador carregue seus imports. Não abra os HTMLs diretamente por `file://`.

## Etapa 7 — banco de dados PostgreSQL

A partir desta etapa, o cadastro, a consulta, a edição e a exclusão de músicas são realizados pela API Node.js e persistidos no PostgreSQL. O `localStorage` não é mais a fonte de dados da biblioteca.

### Preparação (uma única vez)
1. No pgAdmin, crie o banco `riffly` e as tabelas `artists` e `songs` conforme a configuração já realizada.
2. Execute o script `src/backend/database/etapa-07.sql` no Query Tool do banco `riffly`.
3. Copie `src/backend/.env.example` para `src/backend/.env` e informe a senha do usuário `postgres` em `DB_PASSWORD`.
4. Abra um terminal em `src/backend` e execute `npm install`.

### Iniciar
Execute `INICIAR_RIFFLY.bat`. Ele inicia a API e o servidor do frontend em janelas separadas, verifica a conexão com o banco e abre o navegador. Mantenha as duas janelas abertas.

- Frontend: http://127.0.0.1:8000/index.html
- API: http://localhost:3000/api
- Saúde da API/banco: http://localhost:3000/api/health

O arquivo `src/backend/data/musicas.json` foi mantido como registro da Etapa 6, mas não é mais utilizado para persistência.

## Organização do código

O front-end está em `src/frontend`. O ponto de entrada JavaScript é `js/app.js`, que inicializa módulos específicos de cada página. O backend está em `src/backend`, organizado em rotas, controllers, services, repositories e configuração do banco.

## Etapa 5

A documentação da modularização e comunicação assíncrona está em [`docs/etapa-05.md`](docs/etapa-05.md). Na Biblioteca, use **Buscar músicas online** para consultar o catálogo iTunes/Apple e enviar um resultado ao serviço demonstrativo JSONPlaceholder. Essas chamadas exigem internet. O POST do JSONPlaceholder é simulado e não persiste registros.
