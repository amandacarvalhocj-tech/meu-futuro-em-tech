/**
 * Página de resultado (resultado.html).
 * Exibe as carreiras recomendadas ou uma mensagem quando não há dados.
 */

const areaResultado = document.querySelector('#resultado');
const areaSemResultado = document.querySelector('#sem-resultado');
const nomeUsuario = document.querySelector('#nome-usuario');
const sintese = document.querySelector('#sintese');
const listaCarreiras = document.querySelector('#lista-carreiras');
const modeloCarreira = document.querySelector('#modelo-carreira');

function mostrarSemResultado() {
  if (areaResultado) areaResultado.hidden = true;
  if (areaSemResultado) areaSemResultado.hidden = false;
}

function mostrarResultados(dados) {
  if (
    !dados ||
    !Array.isArray(dados.recommended_careers) ||
    dados.recommended_careers.length === 0
  ) {
    mostrarSemResultado();
    return;
  }

  if (!areaResultado || !nomeUsuario || !sintese ||
      !listaCarreiras || !modeloCarreira) {
    console.error('Não foram encontrados todos os elementos do resultado.html.');
    mostrarSemResultado();
    return;
  }

  nomeUsuario.textContent = dados.user_name || 'Estudante';
  sintese.textContent = dados.career_identity_statement || '';

  listaCarreiras.replaceChildren();

  const carreiras = [...dados.recommended_careers].sort(
    (a, b) => Number(b.match_score) - Number(a.match_score)
  );

  carreiras.forEach((carreira, indice) => {
    const cartao = modeloCarreira.content.cloneNode(true);

    const titulo = cartao.querySelector('.carreira__titulo');
    const nota = cartao.querySelector('.carreira__percentual');
    const resumo = cartao.querySelector('.carreira__resumo');
    const selo = cartao.querySelector('.carreira__selo');
    const barra = cartao.querySelector('.barra__nivel');
    const competencias = cartao.querySelector('.chips');
    const roteiro = cartao.querySelector('.roteiro');

    if (titulo) titulo.textContent = carreira.title || 'Carreira';
    if (nota) nota.textContent = `${Number(carreira.match_score) || 0}%`;
    if (resumo) resumo.textContent = carreira.summary || '';

    if (selo) {
      selo.hidden = indice !== 0;
      selo.textContent = 'Melhor combinação';
    }

    if (barra) {
      const pontuacao = Math.max(
        0,
        Math.min(100, Number(carreira.match_score) || 0)
      );

      barra.style.setProperty('--nivel', `${pontuacao}%`);
      barra.setAttribute('role', 'progressbar');
      barra.setAttribute('aria-valuemin', '0');
      barra.setAttribute('aria-valuemax', '100');
      barra.setAttribute('aria-valuenow', String(pontuacao));
      barra.setAttribute('aria-label', 'Compatibilidade com a carreira');
    }

    if (competencias) {
      competencias.replaceChildren();

      (Array.isArray(carreira.key_skills) ? carreira.key_skills : [])
        .forEach((competencia) => {
          const item = document.createElement('li');
          item.textContent = competencia;
          competencias.appendChild(item);
        });
    }

    if (roteiro) {
      roteiro.replaceChildren();

      (Array.isArray(carreira.learning_path) ? carreira.learning_path : [])
        .forEach((passo) => {
          const item = document.createElement('li');
          item.textContent = passo;
          roteiro.appendChild(item);
        });
    }

    listaCarreiras.appendChild(cartao);
  });

  areaSemResultado.hidden = true;
  areaResultado.hidden = false;
}

const estaEmModoExemplo = new URLSearchParams(window.location.search).has('exemplo');

if (estaEmModoExemplo) {
  mostrarResultados(
    typeof DADOS_EXEMPLO !== 'undefined' ? DADOS_EXEMPLO : null
  );
} else {
  try {
    const resultadoSalvo = sessionStorage.getItem(CONFIG.CHAVE_RESULTADO);
    mostrarResultados(resultadoSalvo ? JSON.parse(resultadoSalvo) : null);
  } catch (erro) {
    console.error('Não foi possível ler os dados do resultado:', erro);
    mostrarSemResultado();
  }
}