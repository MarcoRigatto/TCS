# Riffly — Etapa 02: Protótipo Estrutural

## 1. Funcionalidades implementadas

Nesta etapa foi desenvolvido o primeiro protótipo estrutural do Riffly utilizando HTML semântico.

Foram implementadas interfaces para:

- Visualização do dashboard do repertório;
- Visualização da biblioteca de músicas;
- Pesquisa e filtragem de músicas;
- Cadastro de novas músicas;
- Seleção de afinação, instrumento, dificuldade e status de aprendizado;
- Cadastro de informações relacionadas às fontes de tablatura.

Os dados apresentados nas páginas são fictícios e utilizados apenas para representar a estrutura e o funcionamento esperado da aplicação nesta etapa.

## 2. Páginas criadas

### Dashboard — `index.html`

Página inicial do Riffly.

Apresenta uma visão geral do repertório, incluindo:

- quantidade de músicas cadastradas;
- músicas dominadas;
- músicas em aprendizado;
- músicas ainda não iniciadas;
- músicas recentemente estudadas;
- atalhos para a biblioteca e cadastro de músicas.

### Biblioteca — `biblioteca.html`

Página destinada à consulta do repertório.

Possui:

- campo de pesquisa;
- filtro por artista;
- filtro por afinação;
- filtro por dificuldade;
- filtro por status de aprendizado;
- filtro por gênero;
- listagem de músicas cadastradas.

### Cadastro de música — `cadastro.html`

Página destinada ao cadastro de uma nova música.

O formulário possui campos para:

- título;
- artista ou banda;
- álbum;
- afinação;
- instrumento;
- gênero;
- dificuldade;
- status de aprendizado;
- tags;
- observações;
- tipo de fonte da tablatura;
- arquivo ou link da tablatura.

## 3. Estrutura HTML

As páginas foram desenvolvidas utilizando HTML5 e elementos semânticos adequados ao conteúdo.

Foi utilizado o elemento `header` para representar o cabeçalho das páginas e `nav` para organizar a navegação principal entre as interfaces.

O conteúdo principal de cada página foi organizado dentro de `main`, utilizando `section` para separar diferentes áreas de conteúdo e `article` para representar informações independentes, como músicas e dados do repertório.

O elemento `footer` foi utilizado para representar o rodapé das páginas.

Na página de cadastro e na área de pesquisa da biblioteca foram utilizados elementos `form`, `label`, `input`, `select`, `textarea` e `button`.

Os elementos `label` possuem associação direta com seus respectivos campos através dos atributos `for` e `id`, facilitando a identificação dos campos do formulário.

Também foram utilizados elementos como `fieldset` e `legend` para organizar grupos relacionados de informações no formulário de cadastro.

## 4. Organização dos arquivos

Os arquivos foram organizados da seguinte maneira:

```text
src/
└── frontend/
    ├── index.html
    ├── biblioteca.html
    └── cadastro.html
