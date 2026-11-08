// =====================================================
// PÁGINA "MEUS LIVROS" - lista de livros
// =====================================================

const corpoTabela = document.querySelector("#lista-livros");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#lista-vazia");

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
}

mostrarLivros(carregarLivros());
