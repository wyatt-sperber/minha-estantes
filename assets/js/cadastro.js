// =====================================================
// PÁGINA "CADASTRAR LIVRO"
// =====================================================

const formLivro = document.querySelector("#form-livro");
const caixaErros = document.querySelector("#erros");

formLivro.addEventListener("submit", function (evento) {
  // Impede o formulário de recarregar a página
  evento.preventDefault();

  const livro = lerFormulario(formLivro);
  const erros = validarLivro(livro);

  mostrarErros(formLivro, caixaErros, erros);

  if (erros.length > 0) {
    return;
  }

  // Cada livro novo ganha um id diferente (o número de milissegundos de agora)
  livro.id = Date.now();

  const livros = carregarLivros();
  livros.push(livro);
  salvarLivros(livros);

  // Volta para a lista avisando que deu certo
  window.location.href = "livros.html?msg=cadastrado";
});

// Ao clicar em "Limpar", some também a caixa de erros
formLivro.addEventListener("reset", function () {
  mostrarErros(formLivro, caixaErros, []);
});

// =====================================================
// BUSCA NA API DA OPEN LIBRARY
// Dados de fora (API) -> preenchem o formulário -> salvos no localStorage
// =====================================================

const formBusca = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#busca-api");
const botaoBuscar = document.querySelector("#botao-buscar");
const statusBusca = document.querySelector("#status-busca");
const listaResultados = document.querySelector("#resultados-api");

// Faz a requisição para a API e devolve a lista de livros encontrados
async function buscarNaOpenLibrary(termo) {
  const url =
    "https://openlibrary.org/search.json?q=" + encodeURIComponent(termo) +
    "&limit=8&fields=title,author_name,first_publish_year,number_of_pages_median,cover_i";

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("A API respondeu com erro " + resposta.status);
  }

  const dados = await resposta.json();
  return dados.docs;
}

// Transforma um resultado da API no formato que o sistema usa
function converterResultado(resultado) {
  let capa = "";
  if (resultado.cover_i) {
    capa = "https://covers.openlibrary.org/b/id/" + resultado.cover_i + "-M.jpg";
  }

  return {
    titulo: resultado.title,
    autor: resultado.author_name ? resultado.author_name.join(", ") : "",
    ano: resultado.first_publish_year || "",
    paginas: resultado.number_of_pages_median || "",
    capa: capa
  };
}

// Mostra um aviso embaixo do campo de busca (tipo: "info", "sucesso" ou "erro")
function mostrarStatusBusca(texto, tipo) {
  statusBusca.textContent = texto;
  statusBusca.className = "mensagem " + tipo;
  statusBusca.hidden = false;
}

// Cria um item da lista para cada livro encontrado
function mostrarResultados(livrosEncontrados) {
  listaResultados.innerHTML = "";

  livrosEncontrados.forEach(function (livro) {
    const item = document.createElement("li");
    item.className = "resultado-api";

    const imagem = livro.capa || "../assets/img/sem-capa.jpg";
    const detalhes = [livro.autor, livro.ano].filter(Boolean).join(" · ");

    item.innerHTML = `
      <img src="${imagem}" alt="Capa de ${escaparHTML(livro.titulo)}" width="45" loading="lazy">
      <div>
        <strong>${escaparHTML(livro.titulo)}</strong>
        <span>${escaparHTML(detalhes)}</span>
      </div>
      <button type="button" class="botao botao-pequeno">Usar este livro</button>
    `;

    // Ao clicar em "Usar este livro", os dados vão para o formulário
    item.querySelector("button").addEventListener("click", function () {
      usarResultado(livro);
    });

    listaResultados.appendChild(item);
  });
}

// Preenche o formulário de cadastro com os dados vindos da API
function usarResultado(livro) {
  const campos = formLivro.elements;

  campos.titulo.value = livro.titulo;
  campos.autor.value = livro.autor;
  campos.ano.value = livro.ano;
  campos.paginas.value = livro.paginas;
  campos.capa.value = livro.capa;

  mostrarStatusBusca(
    'Dados de "' + livro.titulo + '" preenchidos. Agora escolha a categoria e o status e clique em "Salvar livro".',
    "sucesso"
  );

  // Leva a pessoa até o formulário, no campo que ainda falta preencher
  campos.categoria.focus();
}

formBusca.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const termo = campoBusca.value.trim();

  if (termo.length < 2) {
    mostrarStatusBusca("Digite pelo menos 2 letras para buscar.", "erro");
    return;
  }

  mostrarStatusBusca("Buscando livros na Open Library...", "info");
  listaResultados.innerHTML = "";
  botaoBuscar.disabled = true;

  try {
    const resultados = await buscarNaOpenLibrary(termo);

    if (resultados.length === 0) {
      mostrarStatusBusca('Nenhum livro encontrado para "' + termo + '". Tente outro nome.', "info");
    } else {
      const livrosEncontrados = resultados.map(converterResultado);
      mostrarResultados(livrosEncontrados);
      mostrarStatusBusca(
        livrosEncontrados.length + ' resultados para "' + termo + '". Clique em "Usar este livro" para preencher o formulário.',
        "info"
      );
    }
  } catch (erro) {
    mostrarStatusBusca("Não foi possível buscar na Open Library agora. Confira sua internet e tente de novo.", "erro");
  } finally {
    botaoBuscar.disabled = false;
  }
});
