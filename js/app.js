
/**
 * Página do formulário (index.html).
 * Valida os dados e envia o perfil para a API.
 */

const formulario = document.querySelector('#form-perfil');
const modal = document.querySelector('#modal-aviso');
const mensagemModal = document.querySelector('#modal-mensagem');
const botaoEnviar = formulario.querySelector('button[type="submit"]');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const campos = formulario.elements;

  const nome = campos.nome.value.trim();

  const hobbies = campos.hobbies.value
    .split(',')
    .map((hobby) => hobby.trim())
    .filter((hobby) => hobby !== '');

  const interesses = campos.interesses.value
    .split(',')
    .map((interesse) => interesse.trim())
    .filter((interesse) => interesse !== '');

  if (nome.length < 2 || nome.length > 60) {
    campos.nome.focus();
    return;
  }

  if (hobbies.length === 0) {
    mensagemModal.textContent = 'Preencha pelo menos um hobby.';
    modal.showModal();
    campos.hobbies.focus();
    return;
  }

  if (interesses.length === 0) {
    mensagemModal.textContent = 'Preencha pelo menos uma área de interesse.';
    modal.showModal();
    campos.interesses.focus();
    return;
  }

  const perfil = {
    name: nome,
    hobbies: hobbies,
    interests: interesses,
  };

  console.log('Perfil montado:', perfil);

  if (!CONFIG.API_URL) {
    mensagemModal.textContent =
      'A análise de carreira ainda não está disponível. Tente novamente mais tarde.';
    modal.showModal();
    return;
  }

  const textoOriginal = botaoEnviar.textContent;

  botaoEnviar.disabled = true;
  botaoEnviar.textContent = 'Analisando...';

  const controlador = new AbortController();
  const tempoLimite = setTimeout(
    () => controlador.abort(),
    CONFIG.TEMPO_LIMITE_MS
  );

  try {
    const resposta = await fetch(
      `${CONFIG.API_URL}/api/career-match`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(perfil),
        signal: controlador.signal,
      }
    );

    if (!resposta.ok) {
      const erroAPI = await resposta.json().catch(() => null);

      console.error('Resposta de erro da API:', erroAPI);

      throw new Error(
        erroAPI?.message || 'O serviço não conseguiu analisar seu perfil.'
      );
    }

    const resultado = await resposta.json();

    console.log('Resultado recebido:', resultado);

    if (
      !resultado ||
      !Array.isArray(resultado.recommended_careers)
    ) {
      throw new Error('O serviço retornou uma resposta inválida.');
    }

    sessionStorage.setItem(
      CONFIG.CHAVE_RESULTADO,
      JSON.stringify(resultado)
    );

    window.location.href = 'resultado.html';

  } catch (erro) {
    console.error('Erro ao enviar o perfil:', erro);

    mensagemModal.textContent = erro.name === 'AbortError'
      ? 'A análise está demorando mais do que o esperado. Tente novamente mais tarde.'
      : 'Não foi possível analisar seu perfil agora. Verifique sua conexão e tente novamente mais tarde.';

    modal.showModal();

  } finally {
    clearTimeout(tempoLimite);
    botaoEnviar.disabled = false;
    botaoEnviar.textContent = textoOriginal;
  }
});
