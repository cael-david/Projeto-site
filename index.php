<?php session_start(); ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Catálogo de Filmes</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        if (!sessionStorage.getItem("sessionVisited")) {
            alert("Bem-vindo ao nosso site, nos chamamos Cael e Anderson. Sinta-se à vontade para navegar :D.");
            sessionStorage.setItem("sessionVisited", "true");
        }
    });
</script>

<header>
    <h1 class="titulo-centralizado">Catálogo de Filmes</h1>
    <div class="usuario-info">
        <?php if (isset($_SESSION["usuario"])): ?>
            <span class="Ola">Olá, <?= htmlspecialchars($_SESSION["usuario"]) ?>!</span>
            <a href="logout.php" class="botao-header">Sair</a>
            <a href="galeria.php" class="botao-header">ADICIONAR FILME</a>
        <?php else: ?>
            <button onclick="window.location.href='login.php'" class="botao-header">LOGIN</button>
        <?php endif; ?>
    </div>
</header>

<div class="search-bar" style="text-align: center; margin: 20px 0;">
    <input type="text" id="searchInput" placeholder="Pesquisar filmes..." style="width: 60%; padding: 12px 20px; border-radius: 8px; border: 1px solid #ccc; font-size: 16px;">
</div>

<div class="grid-container">
    <?php
    $filmes = [
        ["titulo" => "Shrek", "img" => "imagens/shrek.png"],
        ["titulo" => "Coraline", "img" => "imagens/coraline.jpg"],
        ["titulo" => "Cars", "img" => "imagens/carros.jpg"],
        ["titulo" => "Howl's Moving Castle", "img" => "imagens/castelo_animado.jpg", "nome" => "O castelo animado"],
        ["titulo" => "Puss in Boots: The Last Wish", "img" => "imagens/gato_de_botas.jpg", "nome" => "Gato de Botas 2"],
        ["titulo" => "Tarzan", "img" => "imagens/tarzan.jpg"],
        ["titulo" => "", "img" => "imagens/default.jpg", "nome" => "Erro Proposital"]
    ];

    foreach ($filmes as $filme) {
        $nome = $filme["nome"] ?? $filme["titulo"];
        $link = "detalhes.php?titulo=" . urlencode($filme["titulo"]);
        echo <<<HTML
        <div class="filme-card">
            <a href="$link">
                <img src="{$filme['img']}" alt="$nome">
                <h3>$nome</h3>
            </a>
        </div>
        HTML;
    }
    ?>
</div>

<!-- Filmes adicionados via JavaScript -->
<script>
document.addEventListener("DOMContentLoaded", function () {
    const filmesExtras = JSON.parse(localStorage.getItem("filmesAdicionados") || "[]");
    const container = document.querySelector(".grid-container");

    filmesExtras.forEach(filme => {
        const card = document.createElement("div");
        card.classList.add("filme-card");

        const link = document.createElement("a");
        link.href = "detalhes.php?titulo=" + encodeURIComponent(filme.titulo);

        const img = document.createElement("img");
        img.src = filme.img;
        img.alt = filme.nome;

        const h3 = document.createElement("h3");
        h3.textContent = filme.nome;

        link.appendChild(img);
        link.appendChild(h3);
        card.appendChild(link);
        container.appendChild(card);
    });
});
</script>

<script>
    // Filtro de busca
    document.getElementById("searchInput").addEventListener("keyup", function () {
        const input = this.value.toLowerCase();
        const cards = document.querySelectorAll(".filme-card");

        cards.forEach(card
