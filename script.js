

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função para carregar os detalhes do filme
function carregarDetalhes() {
    // Pega os parâmetros da URL
    const titulo = getUrlParameter('titulo');
    const imagem = getUrlParameter('imagem');
    const sinopse = decodeURIComponent(getUrlParameter('sinopse'));
    const imdb = getUrlParameter('imdb');
    const trailer = getUrlParameter('trailer');

    // Preenche os campos com as informações do filme
    document.getElementById('titulo-filme').textContent = titulo;
    document.getElementById('imagem-filme').src = imagem;
    document.getElementById('sinopse-filme').textContent = sinopse;
    document.getElementById('nota-imdb').textContent = imdb;
    document.getElementById('trailer').textContent = trailer;}

// Chama a função para carregar os detalhes assim que a página for carregada
window.onload = carregarDetalhes;

