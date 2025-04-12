<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalhes do Filme</title>
    <link rel="stylesheet" href="styles2.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <?php
    // Pega o título enviado pela URL
    $titulo = isset($_GET['titulo']) ? urldecode($_GET['titulo']) : "Filme Desconhecido";
    ?>

    <header>
        <h1 id="titulo-filme"><?= htmlspecialchars($titulo) ?></h1>
    </header>

    <div id="detalhes-filme">
        <img id="imagem-filme" alt="Imagem do Filme">
        <p id="nota-imdb"></p>
        <p id="minha-nota"></p>
        <p id="sinopse-filme"></p>
        <p id="minha-opiniao"></p>
        <button id="trailer-button"></button>
    </div>

    <script>
        const tituloFilme = "<?= addslashes($titulo) ?>";
        document.addEventListener("DOMContentLoaded", () => {
            // Agora o JS pode usar a variável 'tituloFilme' pra buscar infos
            console.log("Título recebido:", tituloFilme);
            // Seu código em detalhes.js pode usar essa variável agora
        });
    </script>

    <script src="detalhes.js"></script>
</body>
<footer>
    <div class="footer-container">
        <p>
            <i class="fa-brands fa-whatsapp"></i> 
            <a href="https://wa.me/55XX999999999" target="_blank">+99 (99) 99999-9999 número propositalmente ilustrativo</a>
        </p>
        <p>
            <i class="fa fa-envelope"></i> 
            <a href="mailto:caeldavidsoares@gmail.com">caeldavidsoares@gmail.com</a><br>
            <i class="fa fa-envelope"></i> 
            <a href="andertorresjr10@gmail.com">andertorresjr10@gmail.com</a>
        </p>
    </div>
    <div class="container">
        <div id="voltar">
            <a href="index.php"><img src="imagens/voltar.png" alt="Voltar"></a>
            
        </div>
    </div>
</footer>
</html>
