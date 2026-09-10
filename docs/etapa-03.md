# Etapa 03 — Interface Responsiva com CSS

## Interfaces desenvolvidas

Foram aplicados estilos responsivos nas três interfaces representativas da Etapa 02:

1. **Tela 01 — Início (`index.html`)** — dashboard do Riffly, resumo da biblioteca, músicas recentes e ações rápidas.
2. **Tela 02 — Biblioteca (`biblioteca.html`)** — pesquisa, filtros e exibição das músicas em cards.
3. **Tela 03 — Cadastrar música (`cadastro.html`)** — formulário para cadastro de músicas e informações da fonte da tablatura.

## CSS

O estilo das três páginas é centralizado em `/src/frontend/css/style.css`, mantendo consistência visual e facilitando futuras alterações.

## Responsividade

Foram definidos três comportamentos principais:

- **Desktop:** a partir de 1024px.
- **Tablet:** de 768px a 1023px.
- **Smartphone:** abaixo de 768px.

### Principais decisões

- **CSS Grid** foi utilizado para organizar cards, filtros e campos dos formulários.
- **Flexbox** foi utilizado na navegação, cabeçalho, agrupamento de ações e componentes internos.
- Em telas menores, os grids reduzem a quantidade de colunas para preservar a legibilidade.
- No smartphone, os formulários passam para uma única coluna.
- A navegação é reorganizada para ocupar melhor a largura disponível.
- Botões e ações são adaptados para telas estreitas.
- Os status de aprendizado do cadastro são organizados em duas colunas em telas maiores e uma coluna no smartphone.
- O botão **Pesquisar** da Biblioteca permanece centralizado em uma linha própria abaixo dos filtros.

## Evidências

### Desktop — 1440 × 900

- `desktop-tela-01.png` — Tela 01: Início
- `desktop-tela-02.png` — Tela 02: Biblioteca
- `desktop-tela-03.png` — Tela 03: Cadastrar música

### Tablet — 768 × 1024

- `tablet-tela-01.png` — Tela 01: Início
- `tablet-tela-02.png` — Tela 02: Biblioteca
- `tablet-tela-03.png` — Tela 03: Cadastrar música

### Smartphone — 390 × 844

- `smartphone-tela-01.png` — Tela 01: Início
- `smartphone-tela-02.png` — Tela 02: Biblioteca
- `smartphone-tela-03.png` — Tela 03: Cadastrar música
