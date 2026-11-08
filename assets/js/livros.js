// =====================================================
// PÁGINA "MEUS LIVROS" - lista de livros
// =====================================================

const corpoTabela = document.querySelector("#lista-livros");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#lista-vazia");
const formFiltros = document.querySelector("#form-filtros");
const campoPesquisa = document.querySelector("#pesquisa");
const filtroStatus = document.querySelector("#filtro-status");
const filtroCategoria = document.querySelector("#filtro-categoria");

// Cria uma linha da tabela para um livro
function criarLinha(livro) {
  const linha = document.createElement("tr");

  const nota = livro.nota ? livro.nota + "/5" : "-";

  linha.innerHTML = `
    <td><img src="${caminhoCapa(livro, "../")}" alt="Capa do livro ${escaparHTML(livro.titulo)}" width="50"></td>
    <td class="titulo-livro">${escaparHTML(livro.titulo)}</td>
    <td>${escaparHTML(livro.autor)}</td>
    <td>${CATEGORIAS[livro.categoria] || "Outros"}</td>
    <td>${livro.ano || "-"}</td>
    <td><span class="status ${livro.status}">${STATUS[livro.status]}</span></td>
    <td>${nota}</td>
    <td>
      <div class="acoes">
        <a href="detalhes.html?id=${livro.id}" class="botao botao-pequeno">Detalhes</a>
        <a href="editar.html?id=${livro.id}" class="botao botao-pequeno botao-secundario">Editar</a>
        <button type="button" class="botao botao-pequeno botao-perigo botao-excluir" data-id="${livro.id}">Excluir</button>
      </div>
    </td>
  `;

  return linha;
}

// Mostra a lista de livros na tabela
function mostrarLivros(livros) {
  corpoTabela.innerHTML = "";

  for (const livro of livros) {
    corpoTabela.appendChild(criarLinha(livro));
  }

  // Texto do contador
  if (livros.length === 1) {
    contador.textContent = "1 livro encontrado";
  } else {
    contador.textContent = livros.length + " livros encontrados";
  }

  // Se não tiver nenhum livro, mostra o aviso
  listaVazia.hidden = livros.length > 0;

  ativarBotoesExcluir();
}

// Cada botão "Excluir" da tabela remove o seu livro
function ativarBotoesExcluir() {
  const botoes = document.querySelectorAll(".botao-excluir");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const id = Number(botao.dataset.id);

      if (excluirLivro(id)) {
        atualizarLista();
        mostrarMensagem("Livro excluído da estante.");
      }
    });
  });
}

// Mostra a caixa verde de mensagem no topo da página
function mostrarMensagem(texto) {
  const caixa = document.querySelector("#mensagem");
  caixa.textContent = texto;
  caixa.hidden = false;
}

// Mostra a mensagem de sucesso quando a página abre com ?msg=... no endereço
function mostrarMensagemDaUrl() {
  const mensagens = {
    cadastrado: "Livro cadastrado com sucesso!",
    editado: "Alterações salvas com sucesso!",
    excluido: "Livro excluído da estante."
  };

  const parametros = new URLSearchParams(window.location.search);
  const tipo = parametros.get("msg");

  if (mensagens[tipo]) {
    mostrarMensagem(mensagens[tipo]);
    // Tira o ?msg= do endereço, para a mensagem não voltar ao recarregar a página
    history.replaceState(null, "", "livros.html");
  }
}

// Deixa o texto em minúsculas e sem acentos ("Ponciá" vira "poncia"),
// para a pesquisa achar o livro mesmo se a pessoa digitar sem acento
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Aplica a pesquisa e os filtros e mostra o resultado
function atualizarLista() {
  let livros = carregarLivros();

  // Pesquisa por título ou autor
  const termo = normalizar(campoPesquisa.value.trim());
  if (termo !== "") {
    livros = livros.filter(function (livro) {
      return normalizar(livro.titulo).includes(termo) || normalizar(livro.autor).includes(termo);
    });
  }

  // Filtro por status de leitura
  if (filtroStatus.value !== "todos") {
    livros = livros.filter(function (livro) {
      return livro.status === filtroStatus.value;
    });
  }

  // Filtro por categoria
  if (filtroCategoria.value !== "todas") {
    livros = livros.filter(function (livro) {
      return livro.categoria === filtroCategoria.value;
    });
  }

  mostrarLivros(livros);
}

// A lista muda enquanto a pessoa digita ou troca um filtro
campoPesquisa.addEventListener("input", atualizarLista);
filtroStatus.addEventListener("change", atualizarLista);
filtroCategoria.addEventListener("change", atualizarLista);

// O botão "Pesquisar" também funciona (sem recarregar a página)
formFiltros.addEventListener("submit", function (evento) {
  evento.preventDefault();
  atualizarLista();
});

mostrarMensagemDaUrl();
atualizarLista();
