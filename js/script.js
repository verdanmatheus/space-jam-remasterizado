/* ==========================================================================
   SPACE JAM (1996) REMASTERIZADO: scripts usados em todas as páginas

   1. Lightbox: abre as fotos ampliadas numa janela (modal do Bootstrap)
   2. Botão "voltar ao topo"
   3. Imprimir desenho (livro de colorir da Junior Jam)
   4. Mapa do site no rodapé (montado a partir do menu)
   5. Faixas com rolagem lateral (botões ‹ ›)
   6. "Ler a história" (Looney Tunes Bios)
   7. Frases do Filme (sons da Trilha Sonora)
   ========================================================================== */


/* 1. LIGHTBOX
   Links com data-lightbox abrem a imagem na janela #lightbox, com o alt da
   miniatura como legenda. Sem JavaScript, o link abre a imagem direto. */
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const janelaModal = new bootstrap.Modal(lightbox);
  const imagemGrande = lightbox.querySelector('.lightbox-imagem');
  const legenda = lightbox.querySelector('.lightbox-legenda');

  document.querySelectorAll('[data-lightbox]').forEach(function (link) {
    link.addEventListener('click', function (evento) {
      evento.preventDefault();
      const miniatura = link.querySelector('img');
      const texto = miniatura ? miniatura.alt : '';

      imagemGrande.src = link.href;
      imagemGrande.alt = texto;
      legenda.textContent = texto;
      janelaModal.show();
    });
  });
}


/* 2. VOLTAR AO TOPO: o botão aparece depois de rolar a página */
const botaoTopo = document.querySelector('.btn-topo');

if (botaoTopo) {
  window.addEventListener('scroll', function () {
    botaoTopo.classList.toggle('visivel', window.scrollY > 600);
  });

  botaoTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* 3. IMPRIMIR DESENHO
   Links com data-imprimir abrem o desenho numa aba nova e chamam a
   impressão. Sem JavaScript, só abrem a imagem. */
document.querySelectorAll('[data-imprimir]').forEach(function (link) {
  link.addEventListener('click', function (evento) {
    evento.preventDefault();
    const aba = window.open('', '_blank');
    if (!aba) {
      window.open(link.href, '_blank');  // navegador bloqueou: só abre a imagem
      return;
    }
    aba.document.write(
      '<title>Space Jam - Livro de Colorir</title>' +
      '<img src="' + link.href + '" style="max-width:100%" onload="window.print()">'
    );
    aba.document.close();
  });
});


/* 4. MAPA DO SITE NO RODAPÉ
   Copia os drop-downs do menu para o <nav id="mapa">, então mudar o menu
   já muda o mapa. Cada drop-down vira uma coluna: o título leva ao primeiro
   item (Visão geral) e a lista tem os outros. */
const mapaRodape = document.getElementById('mapa');

if (mapaRodape) {
  document.querySelectorAll('.navbar-sj .dropdown').forEach(function (menu) {
    const itens = menu.querySelectorAll('.dropdown-item');
    const coluna = document.createElement('div');

    const titulo = document.createElement('h2');
    const linkTitulo = document.createElement('a');
    linkTitulo.href = itens[0].getAttribute('href');
    linkTitulo.textContent = menu.querySelector('.dropdown-toggle').textContent;
    titulo.appendChild(linkTitulo);

    const lista = document.createElement('ul');
    for (let i = 1; i < itens.length; i++) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = itens[i].getAttribute('href');
      link.textContent = itens[i].textContent;
      item.appendChild(link);
      lista.appendChild(item);
    }

    coluna.append(titulo, lista);
    mapaRodape.appendChild(coluna);
  });
}


/* 5. FAIXAS COM ROLAGEM LATERAL
   Os botões ‹ › rolam o trilho quase uma tela para o lado. No começo da
   faixa o ‹ some; no fim, some o ›. */
document.querySelectorAll('.faixa').forEach(function (faixa) {
  const trilho = faixa.querySelector('.faixa-trilho');
  const anterior = faixa.querySelector('.faixa-botao.anterior');
  const proximo = faixa.querySelector('.faixa-botao.proximo');

  function atualizarBotoes() {
    anterior.disabled = trilho.scrollLeft <= 5;
    proximo.disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 5;
  }

  function rolar(sentido) {
    trilho.scrollBy({ left: sentido * trilho.clientWidth * 0.9 });
    setTimeout(atualizarBotoes, 600);    // depois que a rolagem suave termina
  }

  anterior.addEventListener('click', function () { rolar(-1); });
  proximo.addEventListener('click', function () { rolar(1); });

  trilho.addEventListener('scroll', atualizarBotoes);
  window.addEventListener('resize', atualizarBotoes);
  atualizarBotoes();
});


/* 6. "LER A HISTÓRIA" (Looney Tunes Bios)
   O botão data-historia copia a imagem, o "No Brasil" e o texto completo do
   card para a janela #historia. O título vem do alt da imagem-título. */
const janelaHistoria = document.getElementById('historia');

if (janelaHistoria) {
  const modalHistoria = new bootstrap.Modal(janelaHistoria);
  const tituloHistoria = janelaHistoria.querySelector('.modal-title');
  const corpoHistoria = janelaHistoria.querySelector('.historia-corpo');

  document.querySelectorAll('[data-historia]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      const card = botao.closest('.card');

      const imagem = card.querySelector('.card-imagem').cloneNode();
      imagem.className = 'historia-imagem';
      const apelido = card.querySelector('.card-subtitle').cloneNode(true);
      const texto = card.querySelector('.card-text').cloneNode(true);

      tituloHistoria.textContent = card.querySelector('.titulo-imagem').alt;
      corpoHistoria.replaceChildren(imagem, apelido, texto);
      modalHistoria.show();
    });
  });
}


/* 7. FRASES DO FILME (trilha.html)
   Cada botão data-som toca o seu arquivo no player <audio id="player-frases">.
   Tocar outra frase para a anterior; clicar de novo na mesma para. */
const player = document.getElementById('player-frases');

if (player) {
  let botaoTocando = null;

  function pararSom() {
    player.pause();
    if (botaoTocando) {
      botaoTocando.classList.remove('tocando');
      botaoTocando.setAttribute('aria-pressed', 'false');
      botaoTocando = null;
    }
  }

  document.querySelectorAll('[data-som]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      const mesmoBotao = botao === botaoTocando;
      pararSom();
      if (mesmoBotao) return;

      player.src = botao.dataset.som;
      player.play();
      botao.classList.add('tocando');
      botao.setAttribute('aria-pressed', 'true');
      botaoTocando = botao;
    });
  });

  player.addEventListener('ended', pararSom);
}
