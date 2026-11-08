// =====================================================
// PÁGINA "DETALHES DO LIVRO"
// =====================================================

const idLivro = pegarIdDaUrl();
const livroAtual = buscarLivroPorId(idLivro);

// Coloca um texto dentro do elemento com o id informado
function preencher(id, texto) {
  document.querySelector("#" + id).textContent = texto;
}

function mostrarDetalhes(livro) {
  document.title = livro.titulo + " - Minha Estante";

  const capa = document.querySelector("#detalhe-capa");
  capa.src = caminhoCapa(livro, "../");
  capa.alt = "Capa do livro " + livro.titulo;

  preencher("detalhe-titulo", livro.titulo);
  preencher("detalhe-autor", livro.autor);

  const status = document.querySelector("#detalhe-status");
  status.textContent = STATUS[livro.status];
  status.className = "status " + livro.status;

  preencher("detalhe-categoria", CATEGORIAS[livro.categoria] || "Outros");
  preencher("detalhe-ano", livro.ano || "Não informado");
  preencher("detalhe-paginas", livro.paginas || "Não informado");
  preencher("detalhe-nota", livro.nota ? livro.nota + "/5" : "Sem nota");
  preencher("detalhe-data", formatarData(livro.dataConclusao));
  preencher("detalhe-favorito", livro.favorito ? "Sim" : "Não");
  preencher("detalhe-observacoes", livro.observacoes || "Nenhuma observação.");

  // Links que dependem do livro
  document.querySelector("#link-editar").href = "editar.html?id=" + livro.id;
  document.querySelector("#link-open-library").href =
    "https://openlibrary.org/search?q=" + encodeURIComponent(livro.titulo);
}

// Botão "Excluir": apaga o livro e volta para a lista
document.querySelector("#botao-excluir").addEventListener("click", function () {
  if (excluirLivro(idLivro)) {
    window.location.href = "livros.html?msg=excluido";
  }
});

if (livroAtual) {
  mostrarDetalhes(livroAtual);
} else {
  // Id inválido: esconde o livro e mostra o aviso
  document.querySelector("#detalhes").hidden = true;
  document.querySelector("#mais-informacoes").hidden = true;
  document.querySelector("#nao-encontrado").hidden = false;
}
