# Etapa 04 — Interatividade com JavaScript

## 1. Visão geral

Nesta etapa, o Riffly recebeu comportamento dinâmico utilizando JavaScript. A implementação passou a permitir cadastrar, pesquisar, filtrar, editar e excluir músicas, atualizar informações do dashboard e consultar os detalhes e as fontes de tablatura de cada música.

A aplicação utiliza `localStorage` como mecanismo de persistência no frontend durante esta etapa. O objetivo é permitir que os dados cadastrados continuem disponíveis após recarregar a página ou reiniciar o servidor local.

## 2. Funcionalidades interativas implementadas

### 2.1 Cadastro de músicas

O formulário da tela `cadastro.html` é interceptado pelo JavaScript, sem recarregar a página. Os dados são validados e, quando válidos, uma nova música é adicionada ao array de músicas e salva no `localStorage`.

Após o cadastro, o formulário é limpo e uma mensagem de sucesso é apresentada na própria tela, permitindo cadastrar outra música.

**Arquivos envolvidos:**
- `src/frontend/cadastro.html`
- `src/frontend/js/app.js`

**Principais conceitos:** eventos de `submit`, manipulação do DOM, funções, arrays, validação, `localStorage` e criação dinâmica de dados.

### 2.2 Pesquisa e filtros da biblioteca

A tela `biblioteca.html` permite pesquisar pelo título e combinar filtros de artista, afinação, dificuldade, status e gênero.

Os resultados são obtidos a partir do array de músicas e filtrados com o método `filter()`. Os cards apresentados na página são reconstruídos dinamicamente pelo JavaScript.

As opções de artista são geradas a partir das músicas cadastradas sem duplicação. As afinações possuem opções predefinidas e também incorporam afinações presentes nas músicas cadastradas.

**Arquivos envolvidos:**
- `src/frontend/biblioteca.html`
- `src/frontend/js/app.js`

**Principais conceitos:** eventos de formulário e clique, arrays, `filter()`, `map()`, `Set`, funções e manipulação do DOM.

### 2.3 Exclusão de músicas

Cada música exibida na biblioteca possui uma ação de exclusão. Antes da remoção, o sistema solicita confirmação ao usuário. Confirmada a operação, a música é removida do array, os dados são salvos novamente e a biblioteca é renderizada com os dados atuais.

O dashboard também utiliza os dados atuais armazenados, evitando que uma música excluída continue aparecendo como parte do repertório.

**Arquivos envolvidos:**
- `src/frontend/biblioteca.html`
- `src/frontend/index.html`
- `src/frontend/js/app.js`

**Principais conceitos:** eventos de clique, `confirm()`, `filter()`, `localStorage`, manipulação do DOM e atualização dinâmica da interface.

### 2.4 Detalhes e edição de músicas

Foi adicionada a tela `musica.html`, acessada por meio do botão **Ver música** na biblioteca. A tela apresenta as informações da música e suas fontes de tablatura.

A ação **Editar música** abre o formulário de cadastro com os dados preenchidos. Ao salvar as alterações, a música é atualizada no array e no `localStorage`, e a aplicação retorna automaticamente para a tela de detalhes da música atualizada.

**Arquivos envolvidos:**
- `src/frontend/musica.html`
- `src/frontend/cadastro.html`
- `src/frontend/js/app.js`

**Principais conceitos:** leitura de parâmetros da URL, preenchimento de formulário, eventos, atualização de objetos, arrays, `map()`, `localStorage` e navegação entre páginas.

### 2.5 Atualização dinâmica do dashboard

A tela inicial calcula dinamicamente a quantidade total de músicas e a quantidade por status de aprendizado. Também apresenta as músicas mais recentes a partir dos dados armazenados.

**Arquivos envolvidos:**
- `src/frontend/index.html`
- `src/frontend/js/app.js`

**Principais conceitos:** arrays, `filter()`, funções, manipulação do DOM e leitura do estado persistido.

## 3. Validações implementadas

O formulário exige o preenchimento de:

- título da música;
- artista ou banda;
- afinação;
- instrumento;
- dificuldade.

Também existe validação da fonte de tablatura quando um link é informado. O endereço deve utilizar `http` ou `https` e ser reconhecido como uma URL válida pelo navegador.

Quando existem erros, os campos correspondentes recebem indicação visual e mensagens explicativas são apresentadas ao usuário. O cadastro ou a edição não são concluídos enquanto houver erros de validação.

## 4. Situações inválidas tratadas

A aplicação trata, entre outras, as seguintes situações:

- tentativa de cadastro com campos obrigatórios vazios;
- tentativa de cadastro/edição com URL de fonte inválida;
- pesquisa que não encontra músicas correspondentes;
- tentativa de acessar uma música inexistente pela tela de detalhes;
- tentativa de excluir uma música que não existe mais no armazenamento;
- dados inválidos ou incompatíveis encontrados no `localStorage`, com recuperação para os dados iniciais.

## 5. Conceitos de programação utilizados

| Requisito da Etapa 04 | Implementação no Riffly |
|---|---|
| Manipulação do DOM | Atualização de cards, contadores, mensagens, formulário e tela de detalhes |
| Tratamento de eventos | `DOMContentLoaded`, `submit` e eventos de clique |
| Validação de formulários | `validarFormulario()` e validação de URL |
| Alteração dinâmica da interface | Renderização da biblioteca, dashboard, mensagens e detalhes |
| Uso de funções | Funções de cadastro, validação, filtragem, renderização e persistência |
| Uso de arrays | Array de músicas, tags e fontes |
| Métodos de iteração | `filter()`, `map()`, `forEach()` e `find()` |
| Tratamento de situações inválidas | Mensagens, estado vazio, confirmação de exclusão e recuperação de armazenamento |

## 6. Matriz de evidências

| Requisito | Funcionalidade relacionada | Arquivo(s) | Evidência |
|---|---|---|---|
| Manipulação do DOM | Cadastro, biblioteca e dashboard | `src/frontend/js/app.js` | `01-cadastro-sucesso2.png`, `05-exclusao-dashboard2.png` |
| Tratamento de eventos | Cadastro, filtros e exclusão | `src/frontend/js/app.js` | `01-cadastro-sucesso2.png`, `03-filtro2.png`, `05-exclusao-dashboard1.png` |
| Validação de formulários | Validação do cadastro | `src/frontend/cadastro.html`, `src/frontend/js/app.js` | `02-validacao-cadastro.png` |
| Alteração dinâmica da interface | Cadastro, filtros, exclusão, edição e dashboard | `src/frontend/js/app.js` | `01-cadastro-sucesso2.png`, `03-filtro2.png`, `05-exclusao-dashboard2.png`, `06-detalhes-edicao3.png` |
| Uso de funções | Todas as funcionalidades JavaScript | `src/frontend/js/app.js` | Código-fonte da versão `etapa-04` |
| Uso de arrays | Cadastro, biblioteca e dashboard | `src/frontend/js/app.js` | Código-fonte da versão `etapa-04` |
| Métodos de iteração | Filtros, renderização e atualização | `src/frontend/js/app.js` | `03-filtro2.png` e código-fonte |
| Tratamento de situações inválidas | Validação e pesquisa sem resultados | `src/frontend/js/app.js` | `02-validacao-cadastro.png`, `04-sem-resultados.png` |

## 7. Evidências do funcionamento

As capturas foram realizadas com a aplicação em funcionamento e demonstram cadastro, validação, filtragem, ausência de resultados, exclusão, detalhes/edição, fontes de tablatura e o estado após o teste de persistência. A especificação da Etapa 04 exige que as evidências demonstrem, quando aplicável, funcionamento normal, alteração dinâmica, validação, entradas inválidas e mensagens ou estados apresentados ao usuário.

### Cadastro

- `01-cadastro-sucesso1.png` — formulário preenchido antes do envio.
- `01-cadastro-sucesso2.png` — mensagem de sucesso após o cadastro.

### Validação

- `02-validacao-cadastro.png` — campos obrigatórios inválidos e mensagens de erro.

### Pesquisa e filtros

- `03-filtro1.png` — biblioteca com os resultados antes da aplicação do filtro.
- `03-filtro2.png` — filtro aplicado com resultado atualizado.
- `04-sem-resultados.png` — pesquisa sem correspondências e mensagem apresentada.

### Exclusão e atualização

- `05-exclusao-dashboard1.png` — confirmação da exclusão.
- `05-exclusao-dashboard2.png` — biblioteca após a exclusão, com quantidade atualizada.

### Detalhes, fontes e edição

- `06-detalhes-edicao1.png` — tela de detalhes com informações e fonte de tablatura.
- `06-detalhes-edicao2.png` — formulário de edição preenchido.
- `06-detalhes-edicao3.png` — tela de detalhes após o salvamento, mostrando os dados atualizados.

### Persistência

- `07-persistencia.png` — estado da aplicação após a reabertura. A persistência foi verificada por procedimento: a aplicação foi encerrada, o servidor local foi finalizado, o Riffly foi iniciado novamente e os dados permaneceram disponíveis. A captura registra o estado final do teste; o procedimento é a comprovação do comportamento de persistência.

As imagens estão em:

`/docs/evidencias/etapa-04/`

## 8. Execução da aplicação

O frontend desta etapa utiliza um servidor HTTP local para executar corretamente as páginas e o `localStorage`.

### Windows

1. Extraia o projeto.
2. Abra a pasta do projeto.
3. Execute `INICIAR_RIFFLY.bat`.
4. Aguarde o navegador abrir o Riffly.
5. Mantenha a janela do servidor aberta durante o uso.

O script inicia o servidor na porta `8000` e abre a aplicação em `http://127.0.0.1:8000/index.html`.

### Execução manual

Também é possível abrir um terminal na pasta `src/frontend` e executar:

```text
python -m http.server 8000 --bind 127.0.0.1
```

Depois, acessar no navegador:

```text
http://127.0.0.1:8000/index.html
```

## 9. Roteiro de testes

### Cadastro

1. Acesse **Cadastrar música**.
2. Preencha os campos obrigatórios.
3. Salve a música.
4. Verifique a mensagem de sucesso.
5. Acesse a Biblioteca e confirme que a música foi adicionada.

### Validação

1. Acesse o cadastro.
2. Deixe um ou mais campos obrigatórios vazios.
3. Tente salvar.
4. Verifique as mensagens de erro e a permanência na tela.

### Pesquisa e filtros

1. Acesse a Biblioteca.
2. Pesquise pelo título ou utilize os filtros.
3. Clique em **Pesquisar**.
4. Verifique a atualização dos cards e do contador de resultados.
5. Teste uma combinação sem resultados.

### Exclusão

1. Na Biblioteca, escolha uma música.
2. Clique em **Excluir**.
3. Confirme a operação.
4. Verifique que a música desapareceu da biblioteca.
5. Acesse o Início e confirme a atualização dos números e das músicas recentes.

### Edição e detalhes

1. Na Biblioteca, clique em **Ver música**.
2. Clique em **Editar música**.
3. Altere alguma informação.
4. Salve as alterações.
5. Confirme que a aplicação retorna automaticamente para a tela da música e apresenta os dados atualizados.

### Persistência

1. Cadastre ou edite uma música.
2. Confirme a alteração.
3. Feche o navegador e encerre o servidor local.
4. Inicie novamente o `INICIAR_RIFFLY.bat`.
5. Verifique se os dados permanecem disponíveis.

## 10. Estrutura relacionada à Etapa 04

```text
src/
└── frontend/
    ├── index.html
    ├── biblioteca.html
    ├── cadastro.html
    ├── musica.html
    ├── css/
    │   └── style.css
    └── js/
        └── app.js

/docs/
├── proposta.md
├── etapa-03.md
├── etapa-04.md
└── evidencias/
    └── etapa-04/
```

## 11. Identificação da versão

A versão correspondente a esta entrega deverá ser identificada no Git pela tag:

`etapa-04`
