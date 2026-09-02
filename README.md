# Riffly 🎸

**Organize. Practice. Play.**

Riffly é uma aplicação Web para músicos que desejam organizar seu repertório, centralizar suas tablaturas e acompanhar seu processo de prática e aprendizado.

## Sobre o projeto

Músicos que estudam por conta própria podem utilizar diferentes formatos e fontes de tablaturas para aprender uma música. Uma mesma música pode possuir uma tablatura em Guitar Pro, um PDF, uma página no Ultimate Guitar ou um vídeo do YouTube.

O Riffly tem como objetivo centralizar essas informações em um único lugar, facilitando a organização, consulta e acompanhamento do repertório.

Além de organizar músicas e tablaturas, a aplicação permitirá registrar sessões de estudo e acompanhar o status de aprendizado de cada música.

## Principais funcionalidades

- Biblioteca de músicas e tablaturas;
- Gerenciamento de afinações;
- Controle do status de aprendizado;
- Registro de sessões de estudo;
- Organização do repertório;
- Pesquisa e filtros;
- Gerenciamento de tags;
- Múltiplas fontes de tablatura para uma mesma música.

## Fontes de tablatura

O Riffly poderá trabalhar com diferentes tipos de fonte:

- Guitar Pro;
- PDF;
- Links para sites externos;
- YouTube;
- Outros arquivos e links.

Uma mesma música poderá possuir várias fontes associadas.

## Principais entidades

- `Song`
- `Artist`
- `Tuning`
- `PracticeSession`
- `Tag`
- `TabSource`

## Tecnologias previstas

### Cliente

- HTML5
- CSS3
- JavaScript
- Bootstrap

### Servidor

- Java
- Spring Boot
- API REST

### Persistência

- PostgreSQL

## Visão geral

```text
┌───────────────┐
│    Usuário    │
└───────┬───────┘
        │
        ▼
┌────────────────────┐
│    Riffly Web      │
│ HTML / CSS / JS    │
│    + Bootstrap     │
└─────────┬──────────┘
          │ HTTP / REST
          ▼
┌────────────────────┐
│   Riffly Server    │
│ Java / Spring Boot │
│      REST API      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│     PostgreSQL     │
└────────────────────┘
```

## Documentação

A proposta inicial do projeto está disponível em:

`/docs/proposta.md`

## Etapas

- `etapa-01` — Proposta e especificação inicial

O projeto será desenvolvido de forma incremental durante o semestre, permitindo a evolução da aplicação conforme as próximas etapas da disciplina.
