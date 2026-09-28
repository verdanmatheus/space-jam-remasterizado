# Space Jam (1996) Remasterizado: como o site funciona

Não precisa instalar nada: abra o `index.html` no navegador. O Bootstrap está salvo no projeto, então o site funciona sem internet (só as fontes do Google caem para Segoe UI).

Para apresentar, prefira a extensão **Live Server** do VS Code (botão direito no `index.html` → *Open with Live Server*) ou o site publicado no GitHub Pages. Aberto direto do arquivo, o YouTube recusa o player do trailer ("Erro 153"); por isso há um link "Assista no YouTube" embaixo dele.

## Arquivos

| Arquivo | O que tem |
|---|---|
| `index.html` | Home: planetas em volta do logo, faixa "Do site de 1996" e "Comece por aqui" |
| `filme.html` | Jam Central: notas de produção (em abas), cineastas, trailer, fotos |
| `elenco.html` | The Lineup: Looney Tunes, jogadores da NBA, atores, vilões |
| `bastidores.html` | Behind the Jam: personagens, esboços, imagens do set, notas técnicas |
| `trilha.html` | Lunar Tunes: músicas, artistas, rádio, frases do filme (com som) |
| `jogos.html` | Junior Jam: quiz, Match the Monstars, dicas, livro de colorir, fotos |
| `css/style.css` | Todo o visual. Tem um índice no topo |
| `css/bootstrap.min.css` e `js/bootstrap.bundle.min.js` | Bootstrap 5.3.3, salvo no projeto. Não editar |
| `js/script.js` | Usado em todas as páginas: foto ampliada, voltar ao topo, imprimir, mapa do rodapé, faixas laterais, "Ler a história", frases do filme |
| `js/jogos.js` | Só na `jogos.html`: quiz e Match the Monstars |
| `img/<página>/` | Imagens de cada página (`img/comum/` é usada em todas) |
| `audio/` | As 15 frases do filme (`.wav` do site de 1996) |

## Como cada página é montada

```
<body class="tema-...">      ← o tema define as cores da página
  <nav> MENU </nav>          ← igual em todas as páginas
  <header class="capa">      ← cenário do filme, planeta, título, texto e atalhos
  <main>
    <section id="..." class="secao">   ← uma por item do drop-down
  </main>
  <footer> RODAPÉ </footer>  ← igual em todas; o mapa do site é montado pelo script
</body>
```

A home não tem capa: ela tem o céu com nebulosa, os planetas e a faixa "Comece por aqui".

## Regras de visual

1. Texto em tom neutro; cor só em títulos, bordas, links e no que está ativo.
2. Uma cor de destaque por página (`--cor-destaque` do tema).
3. Tamanhos de texto só da escala `--texto-...` do `css/style.css`. Nada de `fs-4`, `display-6` ou `h4` como tamanho no HTML.
4. Texto corrido dentro de `<div class="caixa-texto">`, que já limita a largura.

## Receitas: como mudar...

### ...cores, fontes e tamanhos
Tudo fica no começo do `css/style.css`:
- **Fontes:** seção 0. Troque o link do Google Fonts e os nomes em `--fonte-texto` e `--fonte-titulo`.
- **Cores do site todo:** seção 1, `--claro`, `--ouro`, `--apagado` e `--linha`.
- **Cores de uma página:** seção 1, no bloco do tema (`.tema-behind`...). O que o tema não define vem do padrão.
- **Tamanhos de texto:** seção 1, variáveis `--texto-...`. Mudar `--texto-card`, por exemplo, muda todos os títulos de card.
- **Brilho do céu:** o `0.25` em `--estrelas` (0 = céu original, 1 = preto). **Estampas das páginas:** `--fundo-escuro`, no fim dos temas.

### ...o menu e o rodapé
O menu está copiado nas 6 páginas: para mudar um item, use **Ctrl+Shift+H** no VS Code (substituir em todos os arquivos). Na página atual, o link recebe `class="... active"`.

Cada item do drop-down aponta para o `id` de uma seção (ex.: `elenco.html#viloes`). O mapa do rodapé é copiado do menu pelo `js/script.js`, então não precisa ser editado. Mantenha "Visão geral" como primeiro item de cada drop-down: ele vira o título da coluna no rodapé.

### ...a capa de uma página
- **Imagem:** `img/<página>/capa.jpg`, ou o caminho em `--capa` no tema.
- **Mais ou menos escura:** números do `linear-gradient` da `.capa` (seção 4).
- **Título, texto e atalhos:** bloco `<!-- CAPA -->` do HTML da página.

### ...a home
- **Legenda de um planeta:** o `<span class="planeta-nome">` no `index.html`.
- **Tamanho de um planeta:** `width` e `height` da `<img>`, na mesma proporção. Hoje: 76 px de altura, e 84 px nos que têm anel.
- **Posição:** `grid-template-areas` na seção 5 do CSS. É um "desenho" da grade: troque o nome do planeta de lugar.
- **Flutuação:** `@keyframes flutuar` (altura) e `--tempo` de cada planeta (velocidade).
- **Faixa "Do site de 1996":** os links do `<nav class="arquivo-1996">`, que abrem o site original em nova aba.
- **Céu:** `.home::before` é a nebulosa (as cores ficam nos `radial-gradient`) e `.home::after` é o cintilar (velocidade em `animation`). Para tirar um efeito, apague o bloco dele.
- **"Comece por aqui":** cada card tem uma cena (`destaque-imagem`), o link e a página de destino em `<small>`.

### ...cards, fotos e desenhos
Copie um bloco do mesmo tipo, cole do lado e troque imagem, `alt` e texto:

| Onde | Bloco para copiar |
|---|---|
| Galerias | `<div class="col-..."><a class="foto" data-lightbox>...` (use `foto desenho` para desenhos) |
| Faixas do Elenco | `<div class="faixa-item">`. Nos Looney Tunes, escreva o texto inteiro: o card mostra 4 linhas e "Ler a história" mostra o resto |
| Álbum de polaroides | `<figure class="polaroide">` |
| Livro de colorir | `<div class="col">` com o `desenho-colorir` dentro da aba da semana |
| Frases do filme | `<div class="col">` com a `frase`. O `data-som` do botão é o arquivo da pasta `audio/` |
| Notas de Produção | Um botão em `nav-pills` e um `<div class="tab-pane">` com o mesmo `id` |
| Passo a passo (Bastidores) | `<li>` da lista `<ol class="passos">`. O número é automático |

O `alt` das fotos também vira a legenda quando a foto abre ampliada. Imagem dentro de card usa `class="card-imagem"`.

### ...uma imagem pela versão feita com IA
Salve por cima da antiga, **com o mesmo nome e a mesma extensão**. O `width`/`height` do HTML mantém o tamanho na tela. 2× o original basta (4× nas capas). Não troque os `.gif`: são animados.

Estampas que se repetem (`bg-*.png`): amplie um mosaico 3×3 e recorte o quadrado do meio; ampliada sozinha, a estampa fica com linhas nas emendas.

### ...o quiz e o trailer
- **Perguntas:** lista `PERGUNTAS` no começo do `js/jogos.js`. `correta` é a posição da resposta certa (0 = A, 1 = B, 2 = C, 3 = D).
- **Trailer:** no `filme.html`, troque o código depois de `/embed/` no player e depois de `watch?v=` no link de reserva.

## Decisões que tomamos

- **Textos traduzidos e resumidos** do original. Os textos completos em inglês estão no `../site-original/`.
- **Nomes brasileiros** dos personagens, com o original junto.
- **Menu em português.** Os nomes originais (Jam Central, The Lineup...) ficam pequenos no topo de cada drop-down.
- **Planet B-Ball** virou a seção "Jogadores da NBA" do Elenco.
- **Press Box, Jump Station, Stellar Souvenirs e a loja** ficam numa faixa pequena abaixo da órbita e abrem o site original em nova aba. O planeta "Site Map" saiu: o mapa do site está no rodapé de todas as páginas.
- **Vídeos do making of só nos Bastidores.** São os `.mov` de 1996: o navegador baixa em vez de tocar, e cada um mostra o tamanho do arquivo.
- **Planetas e céu animam sempre**, mesmo com as animações do sistema desligadas. Para respeitar essa configuração, acrescente no fim da seção 5 do CSS: `@media (prefers-reduced-motion: reduce) { .planeta img, .home::after { animation: none; } }`
- **Pergunta 6 do quiz:** a resposta original estava numa página quebrada. Usamos "Gênio" (o cartão "Wile E. Coyote, Genius").

## Histórico das versões

Cada versão é uma pasta `site-novo-vN/`.

| Versão | O que mudou |
|---|---|
| v1 | Site refeito com Bootstrap: 6 páginas, menu drop-down, responsivo |
| v2 | Fontes Nunito e Fredoka, céu e planetas ampliados por IA, menu de vidro, mapa do site no rodapé, "Comece por aqui" |
| v3 | Texto em tom neutro e cor só nos detalhes |
| v4 | Sem linhas vermelhas, estampas mais escuras, escala de tamanhos de texto |
| v5 | Capa com cenário nas páginas internas, esboços em abas |
| v6 | Planetas sem o nome desenhado, Nerdlucks e Monstars alinhados |
| v7 | Faixas com rolagem lateral no Elenco, livro de colorir por semana, álbum de polaroides |
| v8 | Home reorganizada (6 planetas, faixa de 1996, céu com nebulosa e cintilar), Bootstrap no projeto, Notas de Produção em abas, frases do filme com som, imagens mais leves |
