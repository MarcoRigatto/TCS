# Riffly — Proposta e Especificação do Projeto

## 1. Nome da aplicação

**Riffly**

**Slogan:** *Organize. Practice. Play.*

O Riffly será uma aplicação Web voltada para músicos que desejam organizar seu repertório, centralizar tablaturas e acompanhar seu processo de aprendizado e prática musical.

---

## 2. Descrição do problema que pretende resolver

Músicos que estudam por conta própria frequentemente utilizam diferentes fontes para encontrar e armazenar tablaturas. Uma música pode estar disponível em um arquivo Guitar Pro, em PDF, em um site externo como o Ultimate Guitar ou em um vídeo do YouTube.

Essa variedade de formatos e fontes pode dificultar a organização do repertório. Com o crescimento da quantidade de músicas estudadas, torna-se mais difícil localizar rapidamente uma tablatura, saber qual afinação ela utiliza, identificar quais músicas estão sendo aprendidas e acompanhar a evolução do estudo.

O Riffly pretende resolver esse problema centralizando essas informações em uma única aplicação. O usuário poderá cadastrar suas músicas, associá-las a artistas, afinações, gêneros, dificuldades e tags, além de armazenar diferentes fontes de tablatura para uma mesma música, sejam arquivos locais ou links externos.

A aplicação também permitirá registrar sessões de prática, possibilitando acompanhar o histórico de estudos e a evolução do repertório.

---

## 3. Público-alvo

O público-alvo principal do Riffly são músicos que estudam e praticam por conta própria, especialmente:

- Guitarristas;
- Violonistas;
- Baixistas e outros instrumentistas que utilizam tablaturas;
- Estudantes de música que possuem um repertório digital;
- Músicos que utilizam diferentes formatos e fontes de tablaturas.

---

## 4. Objetivo principal da aplicação

O objetivo principal do Riffly é **centralizar, organizar e facilitar o acesso ao repertório musical e às diferentes fontes de tablaturas de um músico, permitindo também acompanhar seu processo de prática e aprendizado.**

---

## 5. Funcionalidades

### 5.1 Biblioteca de músicas e tablaturas

Permitir o cadastro e gerenciamento das músicas que fazem parte do repertório do usuário, armazenando informações como título, artista, álbum, afinação, instrumento, gênero, dificuldade, status de aprendizado e observações.

### 5.2 Gerenciamento de afinações

Permitir cadastrar e utilizar diferentes afinações, incluindo suas respectivas notas, possibilitando organizar e localizar músicas de acordo com a afinação utilizada.

Exemplos:

- Standard;
- Drop D;
- Drop C;
- D Standard.

### 5.3 Gerenciamento do status de aprendizado

Permitir acompanhar o estado de aprendizado de cada música.

Os estados inicialmente previstos são:

- Não iniciada;
- Aprendendo;
- Em prática;
- Dominada.

### 5.4 Registro de sessões de estudo

Permitir registrar sessões de prática relacionadas a uma música, contendo informações como data, duração, BPM e observações.

### 5.5 Gerenciamento do repertório

Permitir visualizar e organizar as músicas de acordo com seu estado de aprendizado, possibilitando identificar músicas já dominadas, músicas em estudo e músicas que ainda não foram iniciadas.

### 5.6 Pesquisa e filtros

Permitir localizar músicas por diferentes critérios, como:

- Nome;
- Artista;
- Afinação;
- Dificuldade;
- Status de aprendizado;
- Gênero;
- Tags.

Também deverá ser possível combinar diferentes filtros para realizar consultas mais específicas.

### 5.7 Gerenciamento de tags

Permitir adicionar tags personalizadas às músicas para facilitar sua organização e localização.

Exemplos:

- Rock;
- Riff;
- Solo;
- Fingerstyle;
- Favorita;
- Rhythm.

### 5.8 Gerenciamento de fontes de tablatura

O Riffly permitirá associar uma ou mais fontes de tablatura a cada música.

As fontes poderão ser:

- Arquivos Guitar Pro;
- Arquivos PDF;
- Links para sites externos;
- Links para vídeos do YouTube;
- Outros arquivos ou links relevantes.

Uma mesma música poderá possuir diversas fontes simultaneamente.

---

## 6. Entidades ou conceitos importantes do domínio

### 6.1 Song

Representa uma música cadastrada no repertório do usuário.

Entre suas informações estão título, álbum, artista, afinação, instrumento, gênero, dificuldade, status de aprendizado e observações.

### 6.2 Artist

Representa o artista ou banda responsável pela música.

Um artista poderá estar relacionado a diversas músicas.

### 6.3 Tuning

Representa uma afinação utilizada pelo instrumento.

Além do nome da afinação, poderá armazenar as notas correspondentes às cordas do instrumento.

### 6.4 PracticeSession

Representa uma sessão de estudo realizada pelo usuário para uma determinada música.

Pode armazenar data, duração, BPM e observações sobre a prática.

### 6.5 Tag

Representa uma etiqueta personalizada utilizada para classificar e organizar músicas.

Uma música poderá possuir várias tags, e uma tag poderá estar associada a várias músicas.

### 6.6 TabSource

Representa uma fonte de tablatura associada a uma música.

Uma fonte poderá ser um arquivo local, como Guitar Pro ou PDF, ou um endereço externo, como uma página de tablatura ou um vídeo do YouTube.

Uma música poderá possuir várias fontes de tablatura.

---

## 7. Descrição de telas ou interfaces

### 7.1 Dashboard

Tela inicial da aplicação, apresentando uma visão geral do repertório do usuário.

Deverá apresentar informações como:

- Quantidade de músicas cadastradas;
- Quantidade de músicas dominadas;
- Quantidade de músicas em aprendizado;
- Quantidade de músicas ainda não iniciadas;
- Tempo de prática registrado;
- Músicas recentemente estudadas.

A tela também poderá oferecer atalhos para cadastro de músicas, consulta do repertório e registro de uma nova sessão de prática.

### 7.2 Biblioteca de músicas

Tela destinada à visualização, pesquisa e filtragem das músicas cadastradas.

O usuário poderá pesquisar pelo nome da música e aplicar filtros de artista, afinação, dificuldade, status, gênero e tags.

Cada resultado deverá apresentar informações relevantes da música e permitir acessar sua página de detalhes.

### 7.3 Detalhes da música

Tela que apresenta todas as informações de uma música específica.

Deverá apresentar:

- Nome;
- Artista;
- Álbum;
- Afinação;
- Instrumento;
- Gênero;
- Dificuldade;
- Status de aprendizado;
- Tags;
- Observações;
- Fontes de tablatura;
- Histórico de sessões de prática.

A partir dessa tela, o usuário poderá acessar arquivos ou links de tablatura e registrar uma nova sessão de estudo.

---

## 8. Operações da aplicação

Entre as principais operações previstas estão:

1. **Cadastrar uma música**, informando seus dados e associando artista, afinação, instrumento, gênero, dificuldade e status.
2. **Editar uma música**, permitindo atualizar suas informações conforme o repertório evolui.
3. **Excluir uma música**, removendo uma música que não faça mais parte da biblioteca.
4. **Pesquisar e filtrar músicas**, utilizando diferentes critérios individualmente ou em conjunto.
5. **Adicionar uma fonte de tablatura**, associando um arquivo ou link a uma música.
6. **Atualizar o status de aprendizado**, alterando o estágio de uma música conforme o progresso do usuário.
7. **Registrar uma sessão de estudo**, informando data, duração, BPM e observações.
8. **Consultar o histórico de prática**, visualizando as sessões registradas para uma determinada música.
9. **Gerenciar tags**, criando e associando etiquetas às músicas.
10. **Cadastrar e gerenciar afinações**, permitindo que as músicas sejam organizadas e consultadas de acordo com a afinação utilizada.

---

## 9. Tecnologias pretendidas no cliente

Inicialmente, pretende-se utilizar:

- **HTML5** para estrutura das páginas;
- **CSS3** para estilização;
- **JavaScript** para interações e funcionalidades do lado do cliente;
- **Bootstrap** para auxiliar na construção da interface responsiva.

As tecnologias poderão ser ajustadas durante o desenvolvimento, conforme as necessidades das próximas etapas da disciplina.

---

## 10. Tecnologias pretendidas no servidor

Inicialmente, pretende-se utilizar:

- **Java**;
- **Spring Boot**;
- **API REST** para comunicação entre cliente e servidor.

A arquitetura poderá ser refinada durante as próximas etapas do projeto.

---

## 11. Tecnologia de persistência

Será utilizado inicialmente o **PostgreSQL** como sistema de gerenciamento de banco de dados.

A persistência deverá armazenar informações relacionadas às músicas, artistas, afinações, tags, fontes de tablatura e sessões de prática.

---

## 12. Visão geral da solução

A aplicação será estruturada seguindo uma arquitetura Web em que o cliente será responsável pela interface e interação com o usuário, enquanto o servidor disponibilizará a lógica da aplicação por meio de uma API REST. Os dados serão persistidos em um banco de dados relacional.

```text
                         ┌─────────────────────┐
                         │       USUÁRIO       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      RIFFLY WEB     │
                         │                     │
                         │ HTML / CSS / JS     │
                         │     + Bootstrap     │
                         └──────────┬──────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    RIFFLY SERVER    │
                         │                     │
                         │       Java          │
                         │    Spring Boot      │
                         │      REST API       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     PostgreSQL      │
                         │                     │
                         │ Song                │
                         │ Artist              │
                         │ Tuning              │
                         │ PracticeSession     │
                         │ Tag                 │
                         │ TabSource           │
                         └─────────────────────┘
```

### Principais relacionamentos do domínio

```text
Artist 1 ─────────── N Song

Tuning 1 ─────────── N Song

Song 1 ───────────── N PracticeSession

Song N ───────────── N Tag

Song 1 ───────────── N TabSource
```

A aplicação deverá permitir que uma mesma música possua múltiplas fontes de tablatura, possibilitando centralizar em um único local arquivos Guitar Pro, PDFs e links externos, como páginas de tablatura e vídeos do YouTube.

---

## Evolução prevista

O projeto será desenvolvido de forma incremental durante o semestre. Funcionalidades adicionais poderão ser incorporadas conforme a evolução da aplicação, como metas de estudo, estatísticas mais detalhadas, favoritos, agenda de prática e autenticação de usuários.

Essas funcionalidades não fazem parte obrigatoriamente da primeira versão, mas poderão ser incorporadas posteriormente caso sejam compatíveis com o cronograma e com os objetivos das próximas etapas.
