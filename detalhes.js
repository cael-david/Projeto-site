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
    'Shrek': 'Shrek é um verdadeiro clássico! Sua trilha sonora icônica marcou gerações, e seu humor ácido cria cenas que podem passar despercebidas pelas crianças, mas que os adultos certamente apreciam. As sátiras a grandes clássicos dos contos de fadas são, na minha opinião, um dos pontos mais fortes do filme, tornando-o ainda mais memorável. Sem dúvida, Shrek é um dos melhores filmes que já vi. Mesmo sendo um longa de 2001, seu humor continua atemporal e, para mim, nunca perde a graça. Infelizmente, a animação e a qualidade gráfica já estão um pouco datadas, o que pode causar certo incômodo em algumas cenas. No entanto, isso não tira o charme nem prejudica a experiência—afinal, o carisma e a genialidade do filme continuam intactos.',

    'Cars': 'Carros é um filme incrível, com uma trilha sonora marcante e uma ambientação única. É fascinante ver como os criadores conseguiram adaptar o mundo real para um universo habitado por carros de maneira tão criativa. Mesmo hoje, a animação continua impressionante, e o desenvolvimento dos personagens adiciona uma profundidade que faz você se perguntar se o filme foi realmente feito apenas para crianças. A jornada do protagonista, que começa como um arrogante obcecado pela vitória e se transforma em alguém humilde, disposto a abrir mão do primeiro lugar para ajudar um amigo, é genuinamente emocionante. Por tudo isso, considero Carros um grande filme.',

    'Coraline': 'Coraline é um filme único, com uma atmosfera sombria e fascinante. Sua animação em stop motion confere um charme quase sobrenatural à obra, tornando-a ainda mais envolvente. Os personagens são carismáticos, e o universo criado é rico em detalhes, mergulhando o espectador em uma experiência visual e narrativa memorável. Um dos grandes triunfos do filme, na minha opinião, é a inteligência da protagonista. Diferente de muitos filmes de terror, onde os personagens frequentemente tomam decisões questionáveis, Coraline vai na contramão desse péssimo clichê e constrói uma heroína perspicaz, que enfrenta os desafios com astúcia e coragem. Isso evita o desgaste causado por roteiros previsíveis e eleva ainda mais a qualidade da história. Por tudo isso, considero Coraline uma verdadeira obra de arte.',
    
    'Howl\'s Moving Castle': 'O grandioso estúdio Ghibli me deixa sem ar toda vez que assisto a uma de suas obras de arte, e com O Castelo Animado não é diferente. Cada filme é uma experiência única, e neste, todas as paisagens fantásticas, personagens misteriosos e carismáticos e um universo incrível se unem e se comunicam de forma magistral. Para mim, este filme é perfeito, perfeito em sua complexidade e, ao mesmo tempo, em sua simplicidade. Uma obra verdadeiramente de tirar o fôlego.',

    'Puss in Boots: The Last Wish': 'Que animação linda, cheia de carisma e personalidade. Gato de Botas 2 está a passos largos de seu antecessor, entregando uma história cativante e repleta de aventura. Os vilões são muito bem construídos, com destaque para o Lobo, que, na versão original em inglês, foi dublado pelo grande ator brasileiro Wagner Moura. O filme é enérgico e cheio de ação, mantendo o público envolvido do início ao fim. Na minha opinião, o único defeito foi a inclusão de alguns personagens que ficaram completamente deslocados em relação ao restante da trama. Me refiro, é claro, a Cachinhos Dourados e seus ursos, que, embora não estraguem o filme, também não agregam muito à história. Sinto que faltou algo para que tivessem um propósito mais significativo.',

    'Tarzan': 'Tarzan com certeza é um filme que me marcou muito. Sua animação 2D clássica da Disney é limpa, fluída e visualmente deslumbrante, e quando aliada à poderosa trilha sonora, torna-se simplesmente incrível. O filme encanta em muitos aspectos, desde seus visuais até sua narrativa envolvente, e a batalha final é, sem dúvida, emocionante. Tarzan é um clássico atemporal e merece todo o reconhecimento que tem.',
    
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
