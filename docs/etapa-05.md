# Etapa 05 — Modularização e Comunicação Assíncrona

## 1. Objetivo

A Etapa 05 prepara o front-end do Riffly para consumir dados externos e organiza o JavaScript em módulos com responsabilidades específicas. A biblioteca local continua utilizando `localStorage`; a busca online é uma funcionalidade complementar e não substitui o repertório do usuário.

## 2. Modularização

O antigo arquivo único `app.js` foi dividido em módulos ES (`import`/`export`):

| Arquivo | Responsabilidade |
|---|---|
| `js/app.js` | Ponto de entrada; identifica a página e chama seu inicializador. |
| `js/storage.js` | Dados iniciais, normalização, leitura e gravação no `localStorage`. |
| `js/musicas.js` | Operações de negócio sobre músicas: adicionar, atualizar, excluir, localizar e filtrar. |
| `js/ui.js` | Renderização de cards, dashboard e detalhes; validação e preenchimento de formulários. |
| `js/utils.js` | Funções auxiliares reutilizáveis, como geração de ID, normalização, escape HTML e mensagens. |
| `js/api.js` | Comunicação externa com a Fetch API. |
| `js/biblioteca.js` | Eventos e comportamento da biblioteca, incluindo a busca online. |
| `js/cadastro.js` | Eventos e fluxo de cadastro/edição. |
| `js/dashboard.js` | Inicialização do dashboard. |
| `js/detalhes.js` | Inicialização da tela de detalhes. |

As páginas HTML carregam `js/app.js` com `type="module"`, permitindo utilizar módulos JavaScript nativos do navegador. A execução deve ocorrer por servidor HTTP local, não abrindo os arquivos diretamente via `file://`.

## 3. Comunicação assíncrona

### 3.1 Consulta ao catálogo musical

Na Biblioteca foi adicionada a seção **Buscar músicas online**. O usuário informa o nome de uma música ou artista e o front-end consulta a iTunes Search API, solicitando resultados do tipo música.

- Endpoint: `https://itunes.apple.com/search`
- Parâmetros: `term`, `media=music`, `entity=song`, `limit=12` e `country=br`.
- Método: `GET` por meio de `fetch()`.
- Arquivos: `js/api.js` e `js/biblioteca.js`.

O resultado externo é apresentado separadamente. Ele não é cadastrado automaticamente e não modifica o array local nem o `localStorage`.

### 3.2 Envio para serviço simulado

Cada resultado externo apresenta a ação **Enviar ao serviço de teste**. Ela envia título, artista e álbum ao endpoint `https://jsonplaceholder.typicode.com/posts`, utilizando `fetch()` com método `POST`, cabeçalho JSON e `JSON.stringify()` no corpo.

O JSONPlaceholder é um serviço REST de demonstração. Ele retorna uma resposta simulada de criação, mas não persiste o registro de forma permanente. Portanto, a ação demonstra a comunicação HTTP e não representa o cadastro de uma música na biblioteca Riffly.

- Arquivos: `js/api.js` e `js/biblioteca.js`.
- Método: `POST`.
- Corpo: objeto JSON com `title`, `body` e `userId`.

## 4. Promises e async/await

As funções `buscarMusicasExternas()` e `enviarMusicaParaServicoTeste()` são declaradas como `async` e utilizam `await` para aguardar a resposta de `fetch()` e a conversão do corpo para JSON. Os blocos `try/catch/finally` controlam sucesso, erro e encerramento do estado de carregamento.

## 5. Estados da interface e erros

A busca online demonstra:

- **Carregamento:** mensagem de consulta e botão temporariamente desabilitado/trocado para “Buscando...” ou “Enviando...”.
- **Sucesso:** lista de resultados ou confirmação do retorno do serviço de teste.
- **Sem resultados:** mensagem orientando a tentar outro termo.
- **Erro:** mensagem quando a requisição falha, a resposta HTTP não é bem-sucedida ou o formato recebido é inesperado.
- **Validação:** não permite consultar quando o campo de pesquisa está vazio.

Para observar um erro de comunicação durante o teste, pode-se desligar temporariamente a conexão de rede ou ativar o modo Offline na aba Network do DevTools antes de realizar a busca. Depois, reative a conexão para testar o sucesso.

## 6. Matriz de requisitos e evidências

| Requisito | Implementação | Arquivo(s) | Como verificar |
|---|---|---|---|
| Separar o código em módulos | Módulos ES com `import` e `export` | `js/*.js` | Inspecionar imports/exports e a estrutura da pasta. |
| Evitar arquivo único | Responsabilidades divididas por módulo | `js/app.js`, `storage.js`, `musicas.js`, `ui.js`, `api.js`, módulos de página | Verificar que `app.js` atua como ponto de entrada. |
| Chamadas assíncronas | Consultar catálogo e enviar resultado | `js/api.js` | Pesquisar uma música e enviar um resultado. |
| Fetch API | Requisições GET e POST | `js/api.js` | DevTools > Network. |
| Promises / async/await | Funções assíncronas com `await` | `js/api.js`, `js/biblioteca.js` | Inspecionar as funções de consulta e envio. |
| Estado de carregamento | Mensagens e botões de carregamento | `js/biblioteca.js`, `css/style.css` | Observar “Buscando...” e “Enviando...”. |
| Erros de comunicação | `try/catch`, checagem `response.ok` e mensagens | `js/api.js`, `js/biblioteca.js` | Testar com a rede offline. |
| Dados externos | Catálogo iTunes/Apple e JSONPlaceholder | `js/api.js` | Realizar GET e POST pela interface. |

## 7. Evidências dos testes

As capturas reais dos testes estão em `docs/evidencias/etapa-05/`:

- `02-busca-sucesso.png`: consulta ao iTunes com resultados exibidos;
- `04-envio-sucesso.png`: resposta de sucesso do POST ao JSONPlaceholder;
- `05-erro-comunicacao.png`: falha de comunicação em modo Offline;
- `07-rede-consultas.png`: requisições observadas no painel Rede do Firefox.

O estado de carregamento está implementado e descrito na seção 5. Como as requisições foram rápidas, não foi obtida uma captura nítida desse estado transitório. A pasta de evidências contém instruções para registrar essa captura posteriormente, caso seja desejado.

## 8. Como executar e testar

1. Extraia o projeto completo.
2. No Windows, execute `INICIAR_RIFFLY.bat`.
3. Abra a Biblioteca.
4. Na seção **Buscar músicas online**, pesquise por `System of a Down` ou outro artista.
5. Observe a mensagem de carregamento e os resultados recebidos.
6. Clique em **Enviar ao serviço de teste** em um resultado e observe a mensagem com o identificador retornado.
7. Para testar erro, desligue a rede ou use DevTools > Network > Offline e repita a busca.
8. Reative a rede e repita a operação para verificar o sucesso.
9. Teste também cadastro, edição, exclusão, filtros e dashboard para confirmar que as funções anteriores continuam operando com os módulos.

## 9. Observações importantes

- O repertório próprio do usuário continua salvo no `localStorage` do navegador.
- Os resultados do iTunes são apenas consulta externa e não são gravados automaticamente.
- O POST ao JSONPlaceholder é demonstrativo; o serviço simula a criação e não mantém o registro permanentemente.
- As APIs dependem de conexão com a internet. A aplicação local e as funções baseadas em `localStorage` continuam separadas dessa dependência.
