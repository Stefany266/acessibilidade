    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    let menuAberto = false;

    function toggleMenu() {
      menuAberto = !menuAberto;
      if (menuAberto) {
        opcoesAcessibilidade.classList.add('mostrar');
        botaoAcessibilidade.setAttribute('aria-expanded', 'true');
      } else {
        opcoesAcessibilidade.classList.remove('mostrar');
        botaoAcessibilidade.setAttribute('aria-expanded', 'false');
      }
    }

document.querySelector(".rotacao-botao").addEventListener("click", function () {
  document.querySelector(".menu-acessibilidade").classList.toggle("ativo");
});


    document.addEventListener('click', function(e) {
      if (menuAberto && !opcoesAcessibilidade.contains(e.target) && e.target !== botaoAcessibilidade) {
        toggleMenu();
      }
    });

    document.addEventListener('click', function(e) {
      if (menuAberto && !opcoesAcessibilidade.contains(e.target) && e.target !== botaoAcessibilidade) {
        toggleMenu();
      }
    });

    const root = document.documentElement;
    const aumentarFonteBtn = document.getElementById('aumentar-fonte');
    const diminuirFonteBtn = document.getElementById('diminuir-fonte');
    const alternaContrasteBtn = document.getElementById('alterna-contraste');
    const resetFonteBtn = document.getElementById('reset-font');

    const loadPrefs = () => {
      const fs = localStorage.getItem('fs');
      const dark = localStorage.getItem('dark');
      if (fs) root.style.fontSize = fs;
      if (dark === '1') document.body.classList.add('dark');
    };
    
    const saveFont = () => localStorage.setItem('fs', getComputedStyle(root).fontSize);
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    aumentarFonteBtn.addEventListener('click', () => {
      const cur = parseFloat(getComputedStyle(root).fontSize);
      const next = clamp(cur + 1, 12, 22);
      root.style.fontSize = next + 'px';
      saveFont();
    });
    
    diminuirFonteBtn.addEventListener('click', () => {
      const cur = parseFloat(getComputedStyle(root).fontSize);
      const next = clamp(cur - 1, 12, 22);
      root.style.fontSize = next + 'px';
      saveFont();
    });
    
    resetFonteBtn.addEventListener('click', () => { 
      root.style.fontSize = '16px'; 
      saveFont(); 
    });
  
  alternaContrasteBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('dark', document.body.classList.contains('dark') ? '1' : '0');
  });
  
  loadPrefs();

  const autores = [
    { 
      nome: 'Machado de Assis', 
      movimento: 'Realismo', 
      periodo: 'séc. XIX', 
      obras: ['Memórias Póstumas de Brás Cubas (1881)', 'Dom Casmurro (1899)'], 
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Machado_de_Assis_by_Marc_Ferrez_-_Original.jpg' 
    },
    { 
      nome: 'Clarice Lispector', 
      movimento: 'Geração de 45', 
      periodo: 'séc. XX', 
      obras: ['Perto do Coração Selvagem (1943)', 'A Hora da Estrela (1977)'], 
      img: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Clarice_Lispector%2C_1968.jpg' 
    },
    { 
      nome: 'Carlos Drummond de Andrade', 
      movimento: 'Modernismo', 
      periodo: 'séc. XX', 
      obras: ['Alguma Poesia (1930)', 'A Rosa do Povo (1945)'], 
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Drummond_1970.jpg' 
    },
    { 
      nome: 'Carolina Maria de Jesus', 
      movimento: 'Contemporânea', 
      periodo: 'séc. XX', 
      obras: ['Quarto de Despejo (1960)'], 
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Carolina_Maria_de_Jesus_%28cropped%29.jpg' 
    }
  ];

  const inputBusca = document.getElementById('busca-autores');
  const limparBusca = document.getElementById('limpar-busca');
  
  inputBusca.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card-autor');
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const text = card.querySelector('.card-text').textContent.toLowerCase();
      const listItems = card.querySelectorAll('li');
      let found = false;
      
      if (title.includes(q) || text.includes(q)) {
        found = true;
      } else {
        listItems.forEach(item => {
          if (item.textContent.toLowerCase().includes(q)) {
            found = true;
          }
        });
      }
      
      card.parentElement.style.display = found ? 'block' : 'none';
    });
  });
  
  limparBusca.addEventListener('click', () => { 
    inputBusca.value = ''; 
    const cards = document.querySelectorAll('.card-autor');
    cards.forEach(card => {
      card.parentElement.style.display = 'block';
    });
    inputBusca.focus(); 
  });

  document.getElementById('btn-download').addEventListener('click', () => {
    const leitura = {
      dominioPublico: [
        { titulo: 'Memórias Póstumas de Brás Cubas', autor: 'Machado de Assis', ano: 1881, link: 'https://www.dominiopublico.gov.br' },
        { titulo: 'O Mulato', autor: 'Aluísio Azevedo', ano: 1881, link: 'https://www.dominiopublico.gov.br' },
        { titulo: 'Triste Fim de Policarpo Quaresma', autor: 'Lima Barreto', ano: 1915, link: 'https://www.dominiopublico.gov.br' }
      ],
      contemporaneas: [
        { titulo: 'Quarto de Despejo', autor: 'Carolina Maria de Jesus', ano: 1960 },
        { titulo: 'Grande Sertão: Veredas', autor: 'João Guimarães Rosa', ano: 1956 },
        { titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', ano: 1977 }
      ]
    };
    
    const blob = new Blob([JSON.stringify(leitura, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lista-de-leitura-literatura-brasileira.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  const perguntas = [
    {
      pergunta: "A Semana de Arte Moderna ocorreu em qual cidade e ano?",
      opcoes: [
        { texto: "Rio de Janeiro, 1925", correta: false },
        { texto: "São Paulo, 1922", correta: true },
        { texto: "Belo Horizonte, 1930", correta: false }
      ],
      explicacao: "A Semana de Arte Moderna ocorreu em São Paulo, entre 11 e 18 de fevereiro de 1922, no Teatro Municipal."
    },
    {
      pergunta: "Qual obra marca simbolicamente o início do Realismo no Brasil?",
      opcoes: [
        { texto: "O Guarani", correta: false },
        { texto: "Iracema", correta: false },
        { texto: "Memórias Póstumas de Brás Cubas", correta: true }
      ],
      explicacao: "Memórias Póstumas de Brás Cubas, publicado por Machado de Assis em 1881, é considerado o marco inicial do Realismo brasileiro."
    },
    {
      pergunta: "A ABL (Academia Brasileira de Letras) foi fundada em:",
      opcoes: [
        { texto: "1897", correta: true },
        { texto: "1912", correta: false },
        { texto: "1889", correta: false }
      ],
      explicacao: "A Academia Brasileira de Letras foi fundada em 20 de julio de 1897, por iniciativa de Machado de Assis."
    },
    {
      pergunta: "Carolina Maria de Jesus ficou mundialmente conhecida por qual livro?",
      opcoes: [
        { texto: "Quarto de Despejo", correta: true },
        { texto: "Capitães da Areia", correta: false },
        { texto: "A Hora da Estrela", correta: false }
      ],
      explicacao: "Quarto de Despejo, publicado em 1960, tornou Carolina Maria de Jesus uma das escritoras brasileiras mais traduzidas no mundo."
    },
    {
      pergunta: "O Prêmio Camões foi instituído em:",
      opcoes: [
        { texto: "1959", correta: false },
        { texto: "1988", correta: true },
        { texto: "2001", correta: false }
      ],
      explicacao: "O Prêmio Camões foi instituído em 1988 pelos governos de Brasil e Portugal para laurear autores que tenham contribuído para o enriquecimento do património literário e cultural da língua portuguesa."
    }
  ];

  let perguntaAtual = 0;
  let respostas = [];
  const barraProgresso = document.getElementById('barra-progresso');
  const textoPergunta = document.getElementById('texto-pergunta');
  const opcoesContainer = document.getElementById('opcoes-container');
  const feedbackQuiz = document.getElementById('feedback-quiz');
  const btnAnterior = document.getElementById('btn-anterior');
  const btnProximo = document.getElementById('btn-proximo');
  const resultadoFinal = document.getElementById('resultado-final');
  const pontuacaoFinal = document.getElementById('pontuacao-final');
  const mensagemFinal = document.getElementById('mensagem-final');
  const btnReiniciarQuiz = document.getElementById('btn-reiniciar-quiz');

  function carregarPergunta() {
    const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
    barraProgresso.style.width = `${progresso}%`;
    
    const pergunta = perguntas[perguntaAtual];
    textoPergunta.textContent = pergunta.pergunta;
    
    opcoesContainer.innerHTML = '';
    
    pergunta.opcoes.forEach((opcao, index) => {
      const opcaoElement = document.createElement('div');
      opcaoElement.className = 'opcao-quiz';
      if (respostas[perguntaAtual] === index) {
        opcaoElement.classList.add('selecionada');
      }
      opcaoElement.textContent = opcao.texto;
      opcaoElement.addEventListener('click', () => selecionarOpcao(index));
      opcoesContainer.appendChild(opcaoElement);
    });
    
    feedbackQuiz.style.display = 'none';
    
    btnAnterior.disabled = perguntaAtual === 0;
    
    if (perguntaAtual === perguntas.length - 1) {
      btnProximo.textContent = 'Finalizar';
    } else {
      btnProximo.textContent = 'Próxima';
    }
  }

  function selecionarOpcao(index) {
    const opcoes = opcoesContainer.querySelectorAll('.opcao-quiz');
    opcoes.forEach(opcao => opcao.classList.remove('selecionada'));
    
    opcoes[index].classList.add('selecionada');
    respostas[perguntaAtual] = index;
    
    const pergunta = perguntas[perguntaAtual];
    const opcaoCorreta = pergunta.opcoes.findIndex(op => op.correta);
    
    if (index === opcaoCorreta) {
      opcoes[index].classList.add('correta');
      feedbackQuiz.textContent = "Correto! " + pergunta.explicacao;
      feedbackQuiz.className = 'feedback-quiz feedback-correto';
    } else {
      opcoes[index].classList.add('incorreta');
      opcoes[opcaoCorreta].classList.add('correta');
      feedbackQuiz.textContent = "Incorreto. " + pergunta.explicacao;
      feedbackQuiz.className = 'feedback-quiz feedback-incorreto';
    }
    
    feedbackQuiz.style.display = 'block';
  }

  function avancarPergunta() {
    if (perguntaAtual < perguntas.length - 1) {
      perguntaAtual++;
      carregarPergunta();
    } else {
      finalizarQuiz();
    }
  }

  function retrocederPergunta() {
    if (perguntaAtual > 0) {
      perguntaAtual--;
      carregarPergunta();
    }
  }

  function finalizarQuiz() {
    let acertos = 0;
    respostas.forEach((resposta, index) => {
      if (resposta !== undefined) {
        const opcaoCorreta = perguntas[index].opcoes.findIndex(op => op.correta);
        if (resposta === opcaoCorreta) {
          acertos++;
        }
      }
    });
    
    pontuacaoFinal.textContent = `${acertos}/${perguntas.length}`;
    
    if (acertos === perguntas.length) {
      mensagemFinal.textContent = "Parabéns! Você é um expert em literatura brasileira!";
    } else if (acertos >= perguntas.length * 0.7) {
      mensagemFinal.textContent = "Muito bom! Seu conhecimento sobre literatura brasileira é impressionante.";
    } else if (acertos >= perguntas.length * 0.5) {
      mensagemFinal.textContent = "Bom trabalho! Continue estudando para melhorar ainda mais.";
    } else {
      mensagemFinal.textContent = "Não desanime! A literatura brasileira é vasta e sempre há mais para aprender.";
    }
    
    document.querySelector('.quiz-container').style.display = 'none';
    resultadoFinal.style.display = 'block';
  }

  function reiniciarQuiz() {
    perguntaAtual = 0;
    respostas = [];
    document.querySelector('.quiz-container').style.display = 'block';
    resultadoFinal.style.display = 'none';
    carregarPergunta();
  }

  btnAnterior.addEventListener('click', retrocederPergunta);
  btnProximo.addEventListener('click', avancarPergunta);
  btnReiniciarQuiz.addEventListener('click', reiniciarQuiz);
  carregarPergunta();

  const formContato = document.getElementById('form-contato');
  const okContato = document.getElementById('ok-contato');
  
  formContato.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!formContato.checkValidity()) {
      ev.stopPropagation();
      formContato.classList.add('was-validated');
      return;
    }
    
    const payload = { 
      nome: formContato.nome.value, 
      email: formContato.email.value, 
      mensagem: formContato.mensagem.value, 
      quando: new Date().toISOString() 
    };
    
    localStorage.setItem('contato-demo', JSON.stringify(payload));
    okContato.classList.remove('d-none');
    formContato.reset();
    formContato.classList.remove('was-validated');
  });

  document.getElementById('ano').textContent = new Date().getFullYear();

  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
