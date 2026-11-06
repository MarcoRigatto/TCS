# Evidências — Etapa 05

As capturas abaixo foram registradas durante os testes manuais da aplicação no Firefox.

| Arquivo | O que demonstra |
|---|---|
| `02-busca-sucesso.png` | Consulta ao catálogo externo com o termo "System of a Down" e exibição de 12 resultados. |
| `04-envio-sucesso.png` | Envio POST de um resultado ao JSONPlaceholder e mensagem com o identificador retornado pelo serviço. |
| `05-erro-comunicacao.png` | Busca realizada com o navegador em modo Offline; a aplicação apresenta mensagem de falha de comunicação e mantém a biblioteca local visível. |
| `07-rede-consultas.png` | Painel Rede do Firefox mostrando as requisições GET ao iTunes e seus status. |

## Estado de carregamento

O estado de carregamento está implementado no código: durante a consulta, o botão muda para "Buscando..." e a mensagem informa "Consultando o catálogo externo. Aguarde...". Durante o envio, o botão muda para "Enviando..." e a mensagem informa que os dados estão sendo enviados.

As consultas foram rápidas mesmo com a limitação de rede usada no teste, por isso não foi possível obter uma captura nítida desses estados transitórios. Se necessário, uma captura adicional pode ser feita usando a opção de limitação de rede mais lenta do DevTools e registrando a tela imediatamente após clicar no botão.

As imagens desta pasta são registros dos testes reais; não foram produzidas artificialmente.
