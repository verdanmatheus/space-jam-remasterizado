# Space Jam (1996) Remasterizado

Versão atualizada do site oficial do filme *Space Jam* (1996), feita como trabalho em grupo de Introdução ao Desenvolvimento Web. O site mantém a identidade do original ([spacejam.com/1996](https://www.spacejam.com/1996/)) com layout responsivo, menu drop-down, textos em português e imagens ampliadas por IA.

## Como executar

1. Baixe o repositório: botão **Code → Download ZIP** (e extraia) ou clone pelo GitHub Desktop.
2. Abra o arquivo `index.html` no navegador.

Para editar e ver as mudanças na hora, use o **VS Code** com a extensão **Live Server**: botão direito no `index.html` → *Open with Live Server*.

**Navegador:** Chrome, Edge, Firefox ou Safari atualizados (versões de 2023 em diante).



## Requisitos do trabalho

| Requisito | Onde está |
|---|---|
| Apenas HTML, CSS, JavaScript e Bootstrap | Bootstrap 5.3.3 (`css/bootstrap.min.css` e `js/bootstrap.bundle.min.js`), `css/style.css`, `js/script.js` e `js/jogos.js`. Nenhuma outra biblioteca |
| Ao menos 3 páginas além do `index.html` | 5 páginas: `filme.html`, `elenco.html`, `bastidores.html`, `trilha.html` e `jogos.html` |
| Menu do tipo drop-down | No topo de todas as páginas: um drop-down por seção |
| Ser responsivo | Grid do Bootstrap e menu "hambúrguer" no celular. Testado em 390 px e 1366 px |

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Home: planetas em órbita em volta do logo e "Comece por aqui" |
| `filme.html` | O Filme: notas de produção, cineastas, trailer e 60 fotos |
| `elenco.html` | Elenco: Looney Tunes, jogadores da NBA, atores e vilões |
| `bastidores.html` | Bastidores: criação dos personagens, esboços, imagens do set e notas técnicas |
| `trilha.html` | Trilha Sonora: músicas, artistas, rádio e frases do filme com som |
| `jogos.html` | Jogos: quiz, Match the Monstars, dicas de basquete, livro de colorir e fotos |

## Estrutura

```
index.html, filme.html, elenco.html, bastidores.html, trilha.html, jogos.html
css/
  style.css            visual do site (tem um índice no topo)
  bootstrap.min.css
js/
  script.js            recursos usados em todas as páginas
  jogos.js             quiz e Match the Monstars
  bootstrap.bundle.min.js
img/                   imagens, uma pasta por página
audio/                 frases do filme (.wav do site de 1996)
LEIAME.md              como o código funciona e como alterar cada parte
```

Para mudar cores, textos, planetas, fotos ou perguntas do quiz, veja o **[LEIAME.md](LEIAME.md)**.


## Direitos autorais

SPACE JAM, personagens, nomes, imagens, sons e elementos relacionados são marcas registradas da Warner Bros. © 1996. Trabalho acadêmico, sem fins comerciais.
