// =====================================================
// PÁGINA INICIAL
// =====================================================

const livros = carregarLivros();

// ----- Prateleira com as capas (até 7 livros) -----
const prateleira = document.querySelector("#prateleira");

for (const livro of livros.slice(0, 7)) {
  const link = document.createElement("a");
  link.href = "pages/detalhes.html?id=" + livro.id;
  link.title = livro.titulo;
  link.innerHTML = `<img class="capa" src="${escaparHTML(caminhoCapa(livro, ""))}" data-reserva="${escaparHTML(reservaCapa(livro, ""))}" alt="${escaparHTML(livro.titulo)}">`;
  prateleira.appendChild(link);
}

// ----- Cartões "Lendo agora" -----
const gradeLendo = document.querySelector("#lendo-agora");
const livrosLendo = livros.filter(function (livro) {
  return livro.status === "lendo";
});

for (const livro of livrosLendo) {
  const cartao = document.createElement("article");
  cartao.className = "cartao-livro";
  cartao.innerHTML = `
    <img class="capa" src="${escaparHTML(caminhoCapa(livro, ""))}" data-reserva="${escaparHTML(reservaCapa(livro, ""))}" alt="Capa do livro ${escaparHTML(livro.titulo)}" width="100">
    <div>
      <h3>${escaparHTML(livro.titulo)}</h3>
      <p>${escaparHTML(livro.autor)}</p>
      <span class="status lendo">Lendo</span>
      <a href="pages/detalhes.html?id=${livro.id}">Ver detalhes</a>
    </div>
  `;
  gradeLendo.appendChild(cartao);
}

document.querySelector("#nada-lendo").hidden = livrosLendo.length > 0;

// ----- Números da estante -----
// Conta quantos livros existem de cada status
const contagem = { lido: 0, lendo: 0, "quero-ler": 0 };

for (const livro of livros) {
  contagem[livro.status] = contagem[livro.status] + 1;
}

document.querySelector("#total-livros").textContent = livros.length;
document.querySelector("#total-lidos").textContent = contagem.lido;
document.querySelector("#total-lendo").textContent = contagem.lendo;
document.querySelector("#total-quero-ler").textContent = contagem["quero-ler"];
