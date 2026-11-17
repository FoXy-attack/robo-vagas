# Como montar o Assistente de Vagas

O projeto tem duas partes que conversam entre si:

- **O robô** (roda no Google e busca as vagas)
- **A página** (`web/index.html`, mostra as vagas e adapta o currículo)

## Parte 1: a planilha

1. Entre em [sheets.google.com](https://sheets.google.com) e crie uma planilha em branco.
2. Dê o nome de **Vagas Robô**.
3. Copie o ID da planilha: está na URL, entre `/d/` e `/edit`.
   Exemplo: `docs.google.com/spreadsheets/d/AQUI_O_ID/edit`

## Parte 2: o robô (Apps Script)

1. Na planilha, vá em **Extensões → Apps Script**.
2. Apague tudo e cole o conteúdo de [`apps-script/Codigo.gs`](../apps-script/Codigo.gs).
3. Na linha `PLANILHA_ID`, cole o ID da sua planilha.
4. Salve (Ctrl+S).
5. Clique em **Executar (▶)** na função `buscarVagas`.
   - Autorize quando pedir (Avançado → Permitir).
   - Confira na planilha se as vagas apareceram.
6. Publique para a página conseguir ler:
   - **Implantar → Nova implantação →** tipo **App da Web**.
   - Executar como: **Eu**.
   - Quem pode acessar: **Qualquer pessoa** (importante).
   - Clique em Implantar e copie a URL que termina em `/exec`.

## Parte 3: a página

1. Abra `web/index.html` num editor de texto.
2. Ache a linha `const ROBO_URL="COLE_AQUI_A_URL_DO_SEU_ROBO";`
3. Troque pela URL do seu robô (a que termina em `/exec`).
4. Salve e abra o arquivo no navegador.

## Parte 4: usar

1. Cole sua chave grátis do Gemini ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)) no campo do topo.
2. Na aba **Meu currículo**, anexe seu PDF.
3. Na aba **Vagas do robô**, clique em **Atualizar vagas**.
4. Clique numa vaga: a página calcula a aderência e adapta seu currículo.

## Parte 5 (opcional): rodar sozinho todo dia

1. No Apps Script, clique no ícone de relógio (**Acionadores**).
2. Adicione um acionador: função `buscarVagas`, baseado no tempo, diário, no horário que quiser.
3. Salve. O robô passa a buscar vagas novas todo dia.

## Observações

- As vagas vêm de feeds abertos (Remote OK): muitas são remotas e em inglês.
- Vagas do LinkedIn e da Gupy não entram na busca automática, porque esses sites bloqueiam robôs.
- A chave do Gemini tem limite diário no plano grátis. Se acabar, espere liberar no dia seguinte.
- A página pode rodar como arquivo local ou hospedada (GitHub Pages, Cloudflare Pages).
