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

## Organização do código

O front-end está em `src/frontend`. O ponto de entrada JavaScript é `js/app.js`, que inicializa módulos específicos de cada página. Os dados da biblioteca continuam persistidos no `localStorage` do navegador.

## Etapa 5

A documentação da modularização e comunicação assíncrona está em [`docs/etapa-05.md`](docs/etapa-05.md). Na Biblioteca, use **Buscar músicas online** para consultar o catálogo iTunes/Apple e enviar um resultado ao serviço demonstrativo JSONPlaceholder. Essas chamadas exigem internet. O POST do JSONPlaceholder é simulado e não persiste registros.
