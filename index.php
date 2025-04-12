<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Catálogo de Filmes</title>
     <link rel="stylesheet" href="styles.css">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    
</head>
<body>

<header>
    <h1 class="titulo-centralizado">Catálogo de Filmes</h1>
    <div class="usuario-info">
        <?php if (isset($_SESSION["usuario"])): ?>
            <span class="Ola">Olá, <?= htmlspecialchars($_SESSION["usuario"]) ?>!</span>
            <a href="galeria.php" class="botao-header">Adicionar Filme</a>
            <a href="logout.php" class="botao-header">Sair</a>
        <?php else: ?>
            <span class="Ola">Bem-vindo, visitante! Deseja fazer login?.</span>
            <a href="login.php" class="botao-header">Entrar</a>
        <?php endif; ?>
    </div>
</header>

<div class="search-bar" style="text-align: center; margin: 20px 0;">
    <input type="text" id="searchInput" placeholder="Pesquisar filmes..." style="width: 40%; padding: 12px 20px; border-radius: 8px; border: 1px solid #ccc; font-size: 16px;">
    <select id="filterSelect" style="padding: 12px 20px; border-radius: 8px; border: 1px solid #ccc; font-size: 16px; margin-left: 10px;">
        <option value="todos">Todos</option>
        <option value="predefinidos">Pré-definidos</option>
        <option value="adicionados">Adicionados</option>
    </select>
</div>

<main id="lista-filmes" class="grid-container">
    <!-- Filmes serão carregados aqui via JavaScript -->
</main>

<script>
// Filmes que vêm de fábrica
const filmesPredefinidos = [
    { titulo: "Shrek", display: "Shrek", imagem: "imagens/shrek.png" },
    { titulo: "Coraline", display: "Coraline", imagem: "imagens/coraline.jpg" },
    { titulo: "Cars", display: "Cars", imagem: "imagens/carros.jpg" },
    { titulo: "Howl's Moving Castle", display: "O Castelo Animado", imagem: "imagens/castelo_animado.jpg" },
    { titulo: "Puss in Boots: The Last Wish", display: "Gato de Botas 2", imagem: "imagens/gato_de_botas.jpg" },
    { titulo: "Tarzan", display: "Tarzan", imagem: "imagens/tarzan.jpg" }
];

function carregarFilmes() {
    const container = document.getElementById("lista-filmes");
    container.innerHTML = "";

    // Filmes adicionados pelo usuário
    const filmesAdicionadosRaw = JSON.parse(localStorage.getItem("filmesAdicionados") || "[]");
    const filmesAdicionados = filmesAdicionadosRaw.map(f => ({
        titulo: f.titulo,
        display: f.nome || f.titulo,
        imagem: f.img || 'imagens/default.jpg'
    }));

    // Filtro selecionado
    const filtro = document.getElementById("filterSelect").value;

    // Termo de busca
    const termo = document.getElementById("searchInput").value.toLowerCase();

    // Seleciona filmes de acordo com o filtro
    let lista;
    if (filtro === 'predefinidos') {
        lista = filmesPredefinidos;
    } else if (filtro === 'adicionados') {
        lista = filmesAdicionados;
    } else {
        lista = [...filmesPredefinidos, ...filmesAdicionados];
    }

    // Filtra por termo de busca
    const filmesFiltrados = lista.filter(f => f.display.toLowerCase().includes(termo));

    // Exibe
    if (filmesFiltrados.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Nenhum filme encontrado.</p>';
        return;
    }

    filmesFiltrados.forEach(filme => {
        const div = document.createElement("div");
        div.classList.add("filme-card");

        div.innerHTML = `
            <a href="detalhes.php?titulo=${encodeURIComponent(filme.titulo)}">
                <img src="${filme.imagem}" alt="Capa de ${filme.display}">
                <h2>${filme.display}</h2>
            </a>
        `;

        container.appendChild(div);
    });
}

// Eventos
document.addEventListener("DOMContentLoaded", carregarFilmes);
document.getElementById("searchInput").addEventListener("input", carregarFilmes);
document.getElementById("filterSelect").addEventListener("change", carregarFilmes);
</script>

</body>
<footer>
     <div class="footer-container">
         <p>
             <i class="fa-brands fa-whatsapp"></i> 
             <a href="https://wa.me/55XX999999999" target="_blank">+99 (99) 99999-9999 número meramente ilustrativo</a>
         </p>
         <p>
             <i class="fa fa-envelope"></i> 
             <a href="mailto:caeldavidsoares@gmail.com">caeldavidsoares@gmail.com</a></br>
             <i class="fa fa-envelope"></i> 
             <a href="andertorresjr10@gmail.com">andertorresjr10@gmail.com</a>
         </p>
     </div>
 </footer>
</html>
