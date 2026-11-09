// =====================================================
// MINHA ESTANTE - funções usadas em todas as páginas
// =====================================================

// Nome da "gaveta" do localStorage onde os livros ficam guardados
// (v2: livros de exemplo com as capas reais da Open Library)
const CHAVE_LIVROS = "minha-estante-livros-v2";

// Nomes que aparecem na tela para cada valor salvo
const CATEGORIAS = {
  romance: "Romance",
  contos: "Contos",
  ensaio: "Ensaio",
  poesia: "Poesia",
  biografia: "Biografia",
  historia: "História",
  fantasia: "Fantasia",
  outros: "Outros"
};

const STATUS = {
  "quero-ler": "Quero ler",
  lendo: "Lendo",
  lido: "Lido"
};

// Livros de exemplo, usados só na primeira vez que o site é aberto
const LIVROS_INICIAIS = [
  {
    id: 1,
    titulo: "Torto Arado",
    autor: "Itamar Vieira Junior",
    categoria: "romance",
    ano: 2019,
    paginas: 264,
    isbn: "9786580309313",
    capa: capaOpenLibrary("9786580309313"),
    capaReserva: "assets/img/torto-arado.jpg",
    status: "lido",
    nota: 5,
    dataConclusao: "2026-03-15",
    favorito: true,
    observacoes: "A história das irmãs Bibiana e Belonísia no sertão da Bahia me marcou muito. Um dos melhores livros que já li."
  },
  {
    id: 2,
    titulo: "Estarão as prisões obsoletas?",
    autor: "Angela Davis",
    categoria: "ensaio",
    ano: 2003,
    paginas: 144,
    isbn: "9788574321486",
    capa: capaOpenLibrary("9788574321486"),
    capaReserva: "assets/img/estarao-as-prisoes-obsoletas.jpg",
    status: "lendo",
    nota: "",
    dataConclusao: "",
    favorito: false,
    observacoes: ""
  },
  {
    id: 3,
    titulo: "Olhos d'água",
    autor: "Conceição Evaristo",
    categoria: "contos",
    ano: 2014,
    paginas: 116,
    isbn: "9788534705257",
    capa: capaOpenLibrary("9788534705257"),
    capaReserva: "assets/img/olhos-dagua.jpg",
    status: "lido",
    nota: 5,
    dataConclusao: "2026-05-02",
    favorito: true,
    observacoes: ""
  },
  {
    id: 4,
    titulo: "Ponciá Vicêncio",
    autor: "Conceição Evaristo",
    categoria: "romance",
    ano: 2003,
    paginas: 120,
    isbn: "9788534705318",
    capa: capaOpenLibrary("9788534705318"),
    capaReserva: "assets/img/poncia-vicencio.jpg",
    status: "lendo",
    nota: "",
    dataConclusao: "",
    favorito: false,
    observacoes: ""
  },
  {
    id: 5,
    titulo: "Becos da Memória",
    autor: "Conceição Evaristo",
    categoria: "romance",
    ano: 2006,
    paginas: 200,
    isbn: "9788534705202",
    capa: capaOpenLibrary("9788534705202"),
    capaReserva: "",
    status: "quero-ler",
    nota: "",
    dataConclusao: "",
    favorito: false,
    observacoes: ""
  },
  {
    id: 6,
    titulo: "Insubmissas lágrimas de mulheres",
    autor: "Conceição Evaristo",
    categoria: "contos",
    ano: 2011,
    paginas: 141,
    isbn: "9788592736064",
    capa: capaOpenLibrary("9788592736064"),
    capaReserva: "assets/img/insubmissas-lagrimas-de-mulheres.jpg",
    status: "lido",
    nota: 4,
    dataConclusao: "2026-08-20",
    favorito: false,
    observacoes: ""
  }
];

// Endereço da capa de um livro na Open Library, a partir do ISBN.
// O "?default=false" faz a Open Library dar erro quando não tem a capa,
// e aí o site usa a imagem reserva (veja "Capas" mais abaixo).
function capaOpenLibrary(isbn) {
  return "https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg?default=false";
}

// ----- localStorage -----

// Lê a lista de livros salva. Na primeira visita, salva os livros de exemplo.
function carregarLivros() {
  const texto = localStorage.getItem(CHAVE_LIVROS);

  if (texto === null) {
    salvarLivros(LIVROS_INICIAIS);
    return LIVROS_INICIAIS;
  }

  return JSON.parse(texto);
}

// Salva a lista inteira no localStorage (como texto JSON)
function salvarLivros(livros) {
  localStorage.setItem(CHAVE_LIVROS, JSON.stringify(livros));
}

// Procura um livro pelo id
function buscarLivroPorId(id) {
  const livros = carregarLivros();
  return livros.find(function (livro) {
    return livro.id === id;
  });
}

// ----- Funções de apoio para mostrar os dados -----

// "2026-03-15" vira "15/03/2026"
function formatarData(data) {
  if (!data) {
    return "Não informado";
  }
  const partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Caminho da capa. As páginas dentro de "pages/" precisam de "../" antes.
function caminhoCapa(livro, prefixo) {
  if (!livro.capa) {
    return prefixo + "assets/img/sem-capa.jpg";
  }
  if (livro.capa.startsWith("http")) {
    return livro.capa;
  }
  return prefixo + livro.capa;
}

// Imagem usada se a capa da internet não carregar
function reservaCapa(livro, prefixo) {
  if (livro.capaReserva) {
    return prefixo + livro.capaReserva;
  }
  return prefixo + "assets/img/sem-capa.jpg";
}

// ----- Capas -----
// Se uma imagem com "data-reserva" der erro ao carregar (capa não existe, sem internet...),
// troca pela imagem reserva. O "true" no final faz o evento ser ouvido em todas as imagens da página.
document.addEventListener("error", function (evento) {
  const imagem = evento.target;

  if (imagem.tagName === "IMG" && imagem.dataset.reserva) {
    const reserva = imagem.dataset.reserva;
    delete imagem.dataset.reserva; // apaga para não tentar de novo se a reserva também falhar
    imagem.src = reserva;
  }
}, true);

// Evita que um texto digitado pelo usuário vire código HTML
function escaparHTML(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Pega o "id" que está no endereço da página (ex.: detalhes.html?id=3)
function pegarIdDaUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return Number(parametros.get("id"));
}

// ----- Formulário (usado no cadastro e na edição) -----

// Lê os campos do formulário e monta um objeto livro
function lerFormulario(form) {
  const campos = form.elements;

  return {
    titulo: campos.titulo.value.trim(),
    autor: campos.autor.value.trim(),
    categoria: campos.categoria.value,
    ano: campos.ano.value ? Number(campos.ano.value) : "",
    paginas: campos.paginas.value ? Number(campos.paginas.value) : "",
    capa: campos.capa.value.trim(),
    status: campos.status.value,
    nota: campos.nota.value ? Number(campos.nota.value) : "",
    dataConclusao: campos.data.value,
    favorito: campos.favorito.checked,
    observacoes: campos.observacoes.value.trim()
  };
}

// Confere os dados do livro e devolve uma lista de erros (vazia se estiver tudo certo)
function validarLivro(livro) {
  const erros = [];
  const anoAtual = new Date().getFullYear();
  const hoje = new Date().toISOString().slice(0, 10);

  if (livro.titulo === "") {
    erros.push({ campo: "titulo", texto: "Informe o título do livro." });
  }
  if (livro.autor === "") {
    erros.push({ campo: "autor", texto: "Informe o autor." });
  }
  if (livro.categoria === "") {
    erros.push({ campo: "categoria", texto: "Escolha uma categoria." });
  }
  if (livro.ano !== "" && (livro.ano < 1000 || livro.ano > anoAtual)) {
    erros.push({ campo: "ano", texto: "O ano deve estar entre 1000 e " + anoAtual + "." });
  }
  if (livro.paginas !== "" && livro.paginas < 1) {
    erros.push({ campo: "paginas", texto: "O número de páginas deve ser maior que zero." });
  }
  // A capa pode ser um link da internet ou uma imagem do próprio site (assets/img/...)
  if (livro.capa !== "" && !livro.capa.startsWith("http") && !livro.capa.startsWith("assets/")) {
    erros.push({ campo: "capa", texto: "O link da capa deve começar com http:// ou https://." });
  }
  if (livro.dataConclusao !== "" && livro.dataConclusao > hoje) {
    erros.push({ campo: "data", texto: "A data em que terminou de ler não pode estar no futuro." });
  }

  return erros;
}

// Mostra os erros na caixa vermelha e marca os campos com problema
function mostrarErros(form, caixaErros, erros) {
  // Tira as marcações de erro antigas
  const marcados = form.querySelectorAll(".invalido");
  marcados.forEach(function (campo) {
    campo.classList.remove("invalido");
  });

  if (erros.length === 0) {
    caixaErros.hidden = true;
    return;
  }

  let html = "<p>Corrija os campos abaixo:</p><ul>";
  for (const erro of erros) {
    html += "<li>" + erro.texto + "</li>";
    form.elements[erro.campo].classList.add("invalido");
  }
  html += "</ul>";

  caixaErros.innerHTML = html;
  caixaErros.hidden = false;
  caixaErros.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Coloca os dados de um livro dentro dos campos do formulário (usado na edição)
function preencherFormulario(form, livro) {
  const campos = form.elements;

  campos.titulo.value = livro.titulo;
  campos.autor.value = livro.autor;
  campos.categoria.value = livro.categoria;
  campos.ano.value = livro.ano;
  campos.paginas.value = livro.paginas;
  campos.capa.value = livro.capa;
  campos.status.value = livro.status;
  campos.nota.value = livro.nota;
  campos.data.value = livro.dataConclusao;
  campos.favorito.checked = livro.favorito;
  campos.observacoes.value = livro.observacoes;
}

// Pergunta se o usuário tem certeza e, se sim, tira o livro da lista salva.
// Devolve true se o livro foi excluído.
function excluirLivro(id) {
  const livro = buscarLivroPorId(id);
  const confirmou = confirm('Excluir "' + livro.titulo + '" da sua estante?');

  if (!confirmou) {
    return false;
  }

  const livrosRestantes = carregarLivros().filter(function (item) {
    return item.id !== id;
  });
  salvarLivros(livrosRestantes);
  return true;
}
