<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Adicionar Filme</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<header>
    <h1 class="titulo-centralizado">Adicionar Filme</h1>
    <div class="usuario-info">
        <span class="Ola">Olá, <?= htmlspecialchars($_SESSION["usuario"]) ?>!</span>
        <a href="index.php" class="botao-header">Voltar</a>
        <a href="logout.php" class="botao-header">Sair</a>
    </div>
</header>

<main style="max-width: 600px; margin: auto;">
    <form id="formFilme">
        <label for="titulo">Título original (ex: Interstellar):</label>
        <input type="text" id="titulo" required>

        <button type="button" id="buscarImagem">Buscar Imagem</button><br><br>

        <label for="nome">Nome em português (ex: Interestelar):</label>
        <input type="text" id="nome" required><br><br>

        <label for="imagem">Imagem do IMDb:</label>
        <input type="text" id="imagem" readonly>

        <!-- Div para exibir a imagem -->
        <div class="preview-container">
            <img id="preview-imagem" src="" alt="Prévia do pôster">
        </div>
        <br><br>

        <label for="trailer">Link do trailer (YouTube):</label>
        <input type="text" id="trailer"><br><br>

        <button type="submit">Salvar Filme</button>
    </form>
</main>

<script>
const apiKey = "2a824a87"; // CHAVE DA API NÃO MEXER PELO AMOR DE DEUS

document.getElementById("buscarImagem").addEventListener("click", function () {
    const titulo = document.getElementById("titulo").value.trim();

    if (!titulo) {
        alert("Digite o título do filme antes de buscar a imagem.");
        return;
    }

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                document.getElementById("imagem").value = data.Poster;

                // Mostra a imagem na tela
                const imgPreview = document.getElementById("preview-imagem");
                imgPreview.src = data.Poster;
                imgPreview.style.display = "block";
            } else {
                alert("Filme não encontrado. Verifique o título.");
            }
        })
        .catch(() => {
            alert("Erro ao buscar imagem. Verifique sua conexão.");
        });
});

document.getElementById("formFilme").addEventListener("submit", function (e) {
    e.preventDefault();

    const novoFilme = {
        titulo: document.getElementById("titulo").value.trim(),
        nome: document.getElementById("nome").value.trim(),
        img: document.getElementById("imagem").value.trim(),
        trailer: document.getElementById("trailer").value.trim()
    };

    const filmes = JSON.parse(localStorage.getItem("filmesAdicionados") || "[]");
    filmes.push(novoFilme);
    localStorage.setItem("filmesAdicionados", JSON.stringify(filmes));

    alert("Filme salvo com sucesso!");
    window.location.href = "index.php";
});
</script>

</body>
</html>
