# Minha Estante

Sistema para organizar os livros que eu tenho, estou lendo ou quero ler.

Trabalho Prático Individual.

Site publicado: https://wyatt-sperber.github.io/minha-estantes/

## Entidade principal

Livro: título, autor, categoria, ano, número de páginas, capa, status de leitura, avaliação, data de conclusão, favorito e observações.

## Páginas

- `index.html` - página inicial
- `pages/livros.html` - lista de livros, com pesquisa, filtro e ordenação
- `pages/cadastro.html` - cadastro de livro
- `pages/detalhes.html` - detalhes de um livro
- `pages/editar.html` - edição de livro

## API

Open Library (https://openlibrary.org) para buscar os dados dos livros no cadastro.

## Visual (Etapa 2)

- Cores principais: vinho (`#5b2a3c`) e bege claro (`#f7f3ec`)
- Fontes: Georgia nos títulos e Segoe UI / Arial nos textos
- Layout com Flexbox (cabeçalho, menu, botões, cartões) e Grid (cartões, números, filtros, formulário, detalhes)
- Responsivo, com Media Queries em 900px (tablet) e 600px (celular)

## Funcionalidades (Etapa 3)

- **Cadastrar** livros, com validação dos campos e aviso de sucesso
- **Listar** os livros em uma tabela criada pelo JavaScript
- **Ver detalhes** de cada livro (`detalhes.html?id=...`)
- **Editar** e **excluir** livros (com confirmação antes de excluir)
- **Pesquisar** por título ou autor (funciona com ou sem acento)
- **Filtrar** por status de leitura e por categoria
- **Ordenar** por título, autor, ano ou nota
- **localStorage**: os livros ficam salvos no navegador e voltam quando a página é aberta de novo
- **API da Open Library**: no cadastro, a pessoa busca o livro, escolhe um resultado e o formulário é preenchido com título, autor, ano, páginas e capa

### Arquivos JavaScript

- `assets/js/script.js` - dados iniciais, funções do localStorage e do formulário (usado em todas as páginas)
- `assets/js/inicio.js` - página inicial (livros "Lendo agora" e números)
- `assets/js/livros.js` - lista, pesquisa, filtros, ordenação e exclusão
- `assets/js/cadastro.js` - cadastro e busca na API
- `assets/js/detalhes.js` - página de detalhes
- `assets/js/editar.js` - página de edição

## Etapas

- [x] Etapa 1 - HTML
- [x] Etapa 2 - CSS e responsividade
- [x] Etapa 3 - JavaScript, localStorage e API
