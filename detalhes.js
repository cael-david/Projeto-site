function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get(name);
    console.log(`Parâmetro ${name}:`, paramValue);
    return paramValue;
}

function carregarDetalhes() {
    const titulo = getUrlParameter('titulo');
    if (!titulo) {
        console.error("Parâmetro 'titulo' não foi encontrado na URL.");
        return;
    }

    const imagem = document.getElementById('imagem-filme');
    const tituloFilme = document.getElementById('titulo-filme');
    const notaImdb = document.getElementById('nota-imdb');
    const minhaNota = document.getElementById('minha-nota');
    const sinopseFilme = document.getElementById('sinopse-filme');
    const minhaOpiniao = document.getElementById('minha-opiniao');
    const trailerButton = document.getElementById('trailer-button');

    const apiKey = '2a824a87'; // Chave da API NÃO MEXER PELO AMOR DE DEUS
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;

    // Objeto com detalhes pré-definidos para os filmes do index (exceto "Erro Proposital afinal o erro é de proposito :v")
    const predefinedDetails = {
        "Shrek": {
            sinopse: "Shrek é a história de um ogro que vive sozinho até que sua vida muda quando ele parte em uma aventura.",
            minhaNota: "8.0",
            minhaOpiniao: "Divertido e irreverente, um clássico da animação.",
            trailer: "https://www.youtube.com/watch?v=YkL2U4T68aA"
        },
        "Coraline": {
            sinopse: "Coraline, uma jovem garota, descobre um mundo paralelo que parece melhor que o seu até perceber segredos sombrios.",
            minhaNota: "7.5",
            minhaOpiniao: "Visualmente deslumbrante com uma história intrigante.",
            trailer: "https://www.youtube.com/watch?v=YBnBrmaTFHA"
        },
        "Cars": {
            sinopse: "Em Cars, um carro de corrida conhece novos amigos e aprende lições sobre amizade e humildade.",
            minhaNota: "7.8",
            minhaOpiniao: "Divertido para todas as idades, com belas paisagens e personagens carismáticos.",
            trailer: "https://www.youtube.com/watch?v=SbXIj2T-_uk"
        },
        "Howl's Moving Castle": {
            sinopse: "Uma jovem é transformada em uma senhora e embarca em uma jornada mágica no mundo de um castelo ambulante.",
            minhaNota: "8.2",
            minhaOpiniao: "Encantadora animação repleta de magia e uma narrativa poética.",
            trailer: "https://www.youtube.com/watch?v=iwROgK94zcM"
        },
        "Puss in Boots: The Last Wish": {
            sinopse: "Gato de Botas retorna em uma nova aventura repleta de humor e emoção, em busca de um novo desejo.",
            minhaNota: "8.0",
            minhaOpiniao: "Aventura vibrante e cheia de personalidade.",
            trailer: "https://www.youtube.com/watch?v=9fXh8c18-og"
        },
        "Tarzan": {
            sinopse: "Tarzan, criado na selva, descobre sua verdadeira origem e vive uma jornada de autoconhecimento e aventura.",
            minhaNota: "7.0",
            minhaOpiniao: "Clássico da Disney, com trilha sonora marcante e animação inovadora para sua época.",
            trailer: "https://www.youtube.com/watch?v=evdONoTANJ4"
        }
    };

    console.log("Buscando dados na API com a URL: " + url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos:", data);
            if (data.Response === 'True') {
                imagem.src = data.Poster || 'imagens/default.jpg';
                tituloFilme.textContent = data.Title;
                notaImdb.textContent = `Nota IMDb: ${data.imdbRating}`;

                // Verificar se o filme foi adicionado 
                const filmesSalvos = JSON.parse(localStorage.getItem('filmesAdicionados')) || [];
                const filmeUsuario = filmesSalvos.find(filme => filme.titulo.toLowerCase() === titulo.toLowerCase());

                if (filmeUsuario) {
                    minhaNota.textContent = `Minha Nota: ${filmeUsuario.nota}`;
                    sinopseFilme.textContent = filmeUsuario.sinopse;
                    minhaOpiniao.textContent = `Minha Opinião: ${filmeUsuario.opiniao}`;
                    trailerButton.innerHTML = filmeUsuario.trailer 
                        ? `<a href="${filmeUsuario.trailer}" target="_blank">Assistir Trailer</a>`
                        : 'Trailer indisponível';
                } else if (predefinedDetails[titulo]) {
                    // Verifica se há detalhes pré-definidos para o filme
                    const detalhes = predefinedDetails[titulo];
                    minhaNota.textContent = `Minha Nota: ${detalhes.minhaNota}`;
                    sinopseFilme.textContent = detalhes.sinopse;
                    minhaOpiniao.textContent = `Minha Opinião: ${detalhes.minhaOpiniao}`;
                    trailerButton.innerHTML = `<a href="${detalhes.trailer}" target="_blank">Assistir Trailer</a>`;
                } else {
                    minhaNota.textContent = 'Minha Nota: Não avaliado';
                    sinopseFilme.textContent = 'Sinopse não disponível.';
                    minhaOpiniao.textContent = 'Minha Opinião: não registrada.';
                    trailerButton.innerHTML = 'Trailer indisponível';
                }
            } else {
                // Se a API não encontrar o filme (duvido muito que aconteça)
                imagem.src = 'imagens/default.jpg';
                tituloFilme.textContent = 'Filme não encontrado';
                notaImdb.textContent = 'Desculpe, não conseguimos encontrar as informações deste filme.';
                minhaNota.textContent = 'Minha Nota: indisponível';
                sinopseFilme.textContent = 'Sinopse indisponível.';
                minhaOpiniao.textContent = 'Minha Opinião: indisponível.';
                trailerButton.innerHTML = 'Trailer indisponível';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados do filme:', error);
            tituloFilme.textContent = 'Erro ao carregar detalhes';
        });
}

window.onload = carregarDetalhes;
