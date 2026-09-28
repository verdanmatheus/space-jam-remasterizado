/* ==========================================================================
   SPACE JAM (1996) REMASTERIZADO: jogos da página jogos.html

   1. Quiz de Curiosidades dos Looney Tunes
   2. Match the Monstars (qual Monstar cada Nerdluck vira?)

   No site original, cada resposta era uma página HTML (cerca de 60 páginas).
   Aqui cada jogo é uma lista de dados e algumas funções: para mudar
   perguntas ou respostas, edite só PERGUNTAS e RODADAS.
   ========================================================================== */


/* ==========================================================================
   1. QUIZ
   "correta" é a posição da resposta certa na lista "opcoes":
   0 = A, 1 = B, 2 = C, 3 = D
   ========================================================================== */
const PERGUNTAS = [
  {
    pergunta: 'Qual rival chama o Pernalonga de "long-eared galoot" (algo como "orelhudo pateta")?',
    opcoes: ['Coiote', 'Hortelino Troca-Letras', 'Eufrazino Puxa-Briga', 'Bruxa Hazel'],
    correta: 2,
    explicacao: 'Foi o Eufrazino Puxa-Briga (Yosemite Sam) quem chamou o Pernalonga de "long-eared galoot".'
  },
  {
    pergunta: 'Quantos anos o Pernalonga completou em 1996, ano de lançamento de Space Jam?',
    opcoes: ['56', '37', '88', '91'],
    correta: 0,
    explicacao: 'O Pernalonga estreou em 1940, então tinha 56 anos em 1996.'
  },
  {
    pergunta: 'Quem fez a primeira voz do Pernalonga?',
    opcoes: ['Friz Freleng', 'Michael Maltese', 'Mel Blanc', 'Frank Oz'],
    correta: 2,
    explicacao: 'Mel Blanc foi a primeira voz do Pernalonga e de muitos outros Looney Tunes.'
  },
  {
    pergunta: 'Qual foi o primeiro desenho do Pernalonga?',
    opcoes: ['A Wild Hare', 'Bugs Bunny Gets the Boid', 'Stage Door Cartoon', 'Hare Tonic'],
    correta: 0,
    explicacao: 'A Wild Hare (1940) foi a estreia do Pernalonga.'
  },
  {
    pergunta: 'Quais dois personagens foram criados antes do Pernalonga?',
    opcoes: ['Hortelino e Eufrazino', 'Gaguinho e Patolino', 'Frajola e Piu-Piu', 'Papa-Léguas e Coiote'],
    correta: 1,
    explicacao: 'Gaguinho (Porky Pig) e Patolino (Daffy Duck) vieram antes do Pernalonga.'
  },
  {
    // A página com a resposta desta pergunta já estava quebrada no site original.
    // A resposta "Gênio" vem do famoso cartão "Wile E. Coyote, Genius" dos desenhos.
    pergunta: 'O que está escrito no cartão de visitas do Coiote?',
    opcoes: [
      'Wile E. Coyote, "Caçador Extraordinário"',
      'Wile E. Coyote, "Caçador de Coelhos e Matador de Papa-Léguas"',
      'Wile, o Coiote',
      'Wile E. Coyote, "Gênio"'
    ],
    correta: 3,
    explicacao: 'O cartão diz "Wile E. Coyote, Genius": Wile E. Coyote, Gênio!'
  }
];

const LETRAS = ['a', 'b', 'c', 'd'];      // imagens img/jogos/quiz/a.png, b.png...

const quiz = {
  numero: document.getElementById('quiz-numero'),
  total: document.getElementById('quiz-total'),
  pergunta: document.getElementById('quiz-pergunta'),
  opcoes: document.getElementById('quiz-opcoes'),
  feedback: document.getElementById('quiz-feedback'),
  proxima: document.getElementById('quiz-proxima'),
  atual: 0,
  pontos: 0
};

function mostrarPergunta() {
  const item = PERGUNTAS[quiz.atual];

  quiz.numero.textContent = quiz.atual + 1;
  quiz.total.textContent = PERGUNTAS.length;
  quiz.pergunta.textContent = item.pergunta;
  quiz.feedback.innerHTML = '';
  quiz.proxima.classList.add('d-none');
  quiz.opcoes.innerHTML = '';

  item.opcoes.forEach(function (texto, indice) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn opcao-quiz';
    botao.innerHTML = '<img src="img/jogos/quiz/' + LETRAS[indice] + '.png" alt="' +
      LETRAS[indice].toUpperCase() + '" width="21" height="21"> ';
    botao.append(texto);                 // append evita problemas com aspas no texto
    botao.addEventListener('click', function () {
      responder(indice, botao);
    });
    quiz.opcoes.appendChild(botao);
  });
}

function responder(indice, botaoClicado) {
  const item = PERGUNTAS[quiz.atual];
  const botoes = quiz.opcoes.querySelectorAll('button');

  // trava as opções e mostra qual era a certa
  botoes.forEach(function (botao) { botao.disabled = true; });
  botoes[item.correta].classList.add('certa');

  if (indice === item.correta) {
    quiz.pontos++;
    quiz.feedback.innerHTML = '<img src="img/jogos/quiz/right.png" alt="Certo!" width="112" height="34">';
  } else {
    botaoClicado.classList.add('errada');
    quiz.feedback.innerHTML = '<img src="img/jogos/quiz/wrong.png" alt="Errado!" width="112" height="34">';
  }

  const explicacao = document.createElement('p');
  explicacao.className = 'mt-2 mb-0';
  explicacao.textContent = item.explicacao;
  quiz.feedback.appendChild(explicacao);

  const ultima = quiz.atual === PERGUNTAS.length - 1;
  quiz.proxima.textContent = ultima ? 'Ver resultado' : 'Próxima pergunta';
  quiz.proxima.classList.remove('d-none');
  quiz.proxima.focus();
}

function mostrarResultado() {
  const total = PERGUNTAS.length;
  let mensagem = 'Continue treinando: assista mais desenhos!';
  if (quiz.pontos === total) mensagem = 'Perfeito! Você é um verdadeiro Looney Tune!';
  else if (quiz.pontos >= total / 2) mensagem = 'Muito bem! O Pernalonga ficaria orgulhoso.';

  quiz.pergunta.textContent = 'Você acertou ' + quiz.pontos + ' de ' + total + '!';
  quiz.opcoes.innerHTML = '';
  quiz.feedback.textContent = mensagem;
  quiz.proxima.textContent = 'Jogar de novo';
}

if (quiz.pergunta) {
  quiz.proxima.addEventListener('click', function () {
    if (quiz.atual < PERGUNTAS.length - 1) {
      quiz.atual++;
      mostrarPergunta();
    } else if (quiz.opcoes.children.length > 0) {
      mostrarResultado();
    } else {
      // "Jogar de novo"
      quiz.atual = 0;
      quiz.pontos = 0;
      mostrarPergunta();
    }
  });

  mostrarPergunta();
}


/* ==========================================================================
   2. MATCH THE MONSTARS
   Para cada Nerdluck (em preto e branco), a pessoa escolhe em qual Monstar
   ele se transforma. Acertando, aparece a animação da transformação.
   ========================================================================== */
const PASTA_MATCH = 'img/jogos/monstars/';

const RODADAS = [
  { nerdluck: 'nerdluck1.png', correta: 'zilch',  animacao: 'orange.gif' },
  { nerdluck: 'nerdluck2.png', correta: 'null',   animacao: 'green.gif'  },
  { nerdluck: 'nerdluck3.png', correta: 'bupkus', animacao: 'purple.gif' },
  { nerdluck: 'nerdluck4.png', correta: 'nada',   animacao: 'red.gif'    },
  { nerdluck: 'nerdluck5.png', correta: 'void',   animacao: 'blue.gif'   }
];

const match = {
  numero: document.getElementById('match-numero'),
  total: document.getElementById('match-total'),
  nerdluck: document.getElementById('match-nerdluck'),
  opcoes: document.getElementById('match-opcoes'),
  feedback: document.getElementById('match-feedback'),
  proximo: document.getElementById('match-proximo'),
  atual: 0
};

function mostrarRodada() {
  const rodada = RODADAS[match.atual];

  match.numero.textContent = match.atual + 1;
  match.total.textContent = RODADAS.length;
  match.nerdluck.src = PASTA_MATCH + rodada.nerdluck;
  match.nerdluck.alt = 'Nerdluck número ' + (match.atual + 1) + ', sem cor';
  match.feedback.innerHTML = '';
  match.proximo.classList.add('d-none');
  match.opcoes.classList.remove('d-none');
}

function escolherMonstar(nome) {
  const rodada = RODADAS[match.atual];

  if (nome === rodada.correta) {
    match.opcoes.classList.add('d-none');
    match.feedback.innerHTML =
      '<img src="' + PASTA_MATCH + 'g-right.png" alt="Certo!" width="158" height="44"><br>' +
      '<img src="' + PASTA_MATCH + rodada.animacao + '" alt="Animação do Nerdluck virando o Monstar ' +
      nome.toUpperCase() + '" class="mt-2">' +
      '<p class="mt-2 mb-0">Isso! Este Nerdluck vira o Monstar <strong>' + nome.toUpperCase() + '</strong>.</p>';

    const ultima = match.atual === RODADAS.length - 1;
    match.proximo.textContent = ultima ? 'Jogar de novo' : 'Próximo Nerdluck';
    match.proximo.classList.remove('d-none');
    match.proximo.focus();
  } else {
    match.feedback.innerHTML =
      '<img src="' + PASTA_MATCH + 'g-wrong.png" alt="Errado!" width="136" height="34">' +
      '<p class="mt-2 mb-0">Não é o ' + nome.toUpperCase() + '. Tente de novo!</p>';
  }
}

if (match.nerdluck) {
  match.opcoes.querySelectorAll('[data-monstar]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      escolherMonstar(botao.dataset.monstar);
    });
  });

  match.proximo.addEventListener('click', function () {
    match.atual = (match.atual + 1) % RODADAS.length;  // depois do último, volta ao primeiro
    mostrarRodada();
  });

  mostrarRodada();
}
