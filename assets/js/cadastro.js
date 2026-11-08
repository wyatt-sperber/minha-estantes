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
