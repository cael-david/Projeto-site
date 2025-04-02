function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const sinopses = {
    'Shrek': 'Shrek é um ogro que vive em um pântano até que sua paz seja interrompida por várias criaturas mágicas...',
    'Coraline': 'Coraline Jones, uma jovem garota, encontra uma porta secreta em sua nova casa...',
    'Cars': 'Relâmpago McQueen, um carro de corrida, acaba em uma pequena cidade...',
    'Howl\'s Moving Castle': 'Sophie é transformada em uma velha por uma bruxa e encontra refúgio em um castelo mágico...',
    'Puss in Boots: The Last Wish': 'O Gato de Botas descobre que sua paixão pela aventura cobrou seu preço...',
    'Tarzan': 'Tarzan, um homem criado por gorilas na selva, descobre a verdade sobre sua origem...',
};

const minhasNotas = {
    'Shrek': '9/10',
    'Coraline': '9/10',
    'Cars': '7/10',
    'Howl\'s Moving Castle': '10/10',
    'Puss in Boots: The Last Wish': '7/10',
    'Tarzan': '8/10',
};

const minhasOpinioes = {
    'Shrek': 'Shrek é um filmasso, sua trilha sonora icônica marcou gerações, seu humor ácido gerava cenas de humor que poderia passar despercebidas para crianças mas não para um adulto, suas icónicas satiras a grandes clássicos dos contos de fadas é seu ponto mais forte em minha opinião, com certeza um dos melhores filmes que eu ja vi, shrek mesmo sendo um filme de 2010 tem um humor que ao menos para mim nunca vai perder a graça, infelizmente a animação e qualidade gráfica hoje em dia ja esta meio datada e me gera um pouco de incomodo em algumas cenas, mas não é algo que estrague o filme ou tire seu charme.',

    'Coraline': 'Coraline é um filme único, com uma atmosfera sombria e fascinante sua animação clássica em stop motion da um charme quase sobrenatural para o filme, os personagens são muito carismáticos e o universo muito rico, um dos grandes triunfos deste filme é na minha opinião a inteligência da protagonista, diferentemente de muitos filmes de terror onde os personagens tem uma falta de inteligência descomunal, coraline vai na contramão deste artifico de roteiro que empobrece muitas boas obras, Coraline é por tanto uma obra de arte.',
    
    'Howl\'s Moving Castle': 'O grandisos estúdio Ghibli me deixa sem ar toda vez que vejo uma de suas obras de arte, cada filme é uma experiência única e não seria diferente com castelo animado, todas as paisagens fantásticas, personagens misteriosos e carismaticos e aquele universo incrivel, casam e se comunicam de forma magestral, para mim este filme é perfeito, perfeito em sua complexidade e ao mesmo simplicidade, um filme verdadeiramente de tirar o fôlego.',

    'Puss in Boots: The Last Wish': 'Que animação linda, cheia de carisma e personalidade, Gato de botas 2 esta a passos largos de seu antecessor, uma história cativante e cheia de aventura com certeza, vilões muito bons inclusive o Lobo que na linguagem original no caso o inglês foi dublado pelo grande ator brasileiro Wagner Moura, o filme é enérgico e cheio de ação e na minha opinião o único defeito que este filme teve, foi de apresentar alguns personagens que ficaram totalemente deslocados quanto ao resto, me refiro é claro a cachinhos dourados e seus ursos, eles não estragam o filme mas nem de longe são de grande proveito, sinto que para eles faltou alguma coisa ',

    'Tarzan': 'Tarzan com certeza é um filme que me marcou muito, aquela animação limpa, fluída e clássica 2d da disney aliada a poderosa trilha sonora é com certeza incrivel, a animação é linda em muitos sentidos e a batalha final é com certeza emocionante Tarzan é um clássico atemporal e merece sim todo o reconhecimento que tem',
};

const trailers = {
    'Shrek': 'https://www.youtube.com/watch?v=CwXOrWvPBPk', 
    'Coraline': 'https://www.youtube.com/watch?v=X3Pc9emMSxk', 
    'Cars': 'https://www.youtube.com/watch?v=0I1x9ew1OZU', 
    'Howl\'s Moving Castle': 'https://www.youtube.com/watch?v=iwROgK94zcM', 
    'Puss in Boots: The Last Wish': 'https://www.youtube.com/watch?v=Dyc8YANE6i8', 
    'Tarzan': 'https://www.youtube.com/watch?v=FXmTC6N1YvI', 
};

function carregarDetalhes() {
    const titulo = getUrlParameter('titulo');
    const imagem = document.getElementById('imagem-filme');
    const tituloFilme = document.getElementById('titulo-filme');
    const notaImdb = document.getElementById('nota-imdb');
    const minhaNota = document.getElementById('minha-nota');
    const sinopseFilme = document.getElementById('sinopse-filme');
    const minhaOpiniao = document.getElementById('minha-opiniao');
    const trailerButton = document.getElementById('trailer-button');  // Novo botão para o trailer

    const apiKey = '2a824a87';  // API Key do OMDB
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                imagem.src = data.Poster || 'imagens/default.jpg';
                tituloFilme.textContent = data.Title;
                notaImdb.textContent = `Nota IMDb: ${data.imdbRating}`;
                minhaNota.textContent = `Minha Nota: ${minhasNotas[titulo] || 'Não avaliado'}`;
                sinopseFilme.textContent = sinopses[titulo] || 'Sinopse não disponível.';
                minhaOpiniao.textContent = `Minha Opinião: ${minhasOpinioes[titulo] || 'Não há opinião registrada.'}`;

                // Adicionando o link do trailer ao botão
                const trailerLink = trailers[titulo] || '#'; // Link do trailer específico para o filme
                trailerButton.innerHTML = `<a href="${trailerLink}" target="_blank">Assistir Trailer</a>`; // Atualiza o botão para link
            } else {
                imagem.src = 'imagens/default.jpg'
                tituloFilme.textContent = 'Filme não encontrado';
                notaImdb.textContent = 'Desculpe, não conseguimos encontrar as informações deste filme.';
                minhaNota.textContent = 'Minha Nota: indisponível';
                sinopseFilme.textContent = 'Sinopse indisponível.';
                minhaOpiniao.textContent = 'Minha Opinião: indisponível.';
                trailerButton.innerHTML = ''; // Limpa o botão caso o filme não seja encontrado
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados do filme:', error);
            tituloFilme.textContent = 'Erro ao carregar detalhes';
        });
}

// Carrega os detalhes assim que a página for carregada
window.onload = carregarDetalhes;
