// =====================================================
// PÁGINA "EDITAR LIVRO"
// =====================================================

const formEditar = document.querySelector("#form-editar");
const caixaErros = document.querySelector("#erros");
const idLivro = pegarIdDaUrl();
const livroAtual = buscarLivroPorId(idLivro);

if (livroAtual) {
  document.querySelector("#titulo-edicao").textContent = livroAtual.titulo;
  document.querySelector("#link-cancelar").href = "detalhes.html?id=" + idLivro;
  preencherFormulario(formEditar, livroAtual);
} else {
  // Id inválido: esconde o formulário e mostra o aviso
  document.querySelector("#area-edicao").hidden = true;
  document.querySelector("#nao-encontrado").hidden = false;
}

formEditar.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const livroEditado = lerFormulario(formEditar);
  const erros = validarLivro(livroEditado);

  mostrarErros(formEditar, caixaErros, erros);

  if (erros.length > 0) {
    return;
  }

  // O livro editado continua com o mesmo id
  livroEditado.id = idLivro;

  // Troca o livro antigo pelo editado, na mesma posição da lista
  const livros = carregarLivros();
  const posicao = livros.findIndex(function (livro) {
    return livro.id === idLivro;
  });
  livros[posicao] = livroEditado;
  salvarLivros(livros);

  window.location.href = "livros.html?msg=editado";
});
