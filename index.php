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

    <?php
    // Isso aqui pode ser útil para futuras funcionalidades em PHP (como sessões)
    session_start();
    ?>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            if (!sessionStorage.getItem("sessionVisited")) {
                alert("Bem-vindo ao meu site, me chamo Cael e este site foi feito para meu estudo, sinta-se à vontade para entrar em contato e me informar algumas possíveis melhorias :D.");
                sessionStorage.setItem("sessionVisited", "true");
            }
        });
    </script>

    <header>
        <h1>Catálogo de Filmes</h1>
        <div class="topo">
            <button class="botao-header" onclick="window.location.href='login.php'">LOGIN</button>
        </div>
    </header>

    <div class="grid-container">
        <?php
        // Lista de filmes (você pode transformar isso em array PHP no futuro)
        $filmes = [
            ["titulo" => "Shrek", "img" => "imagens/shrek.png"],
            ["titulo" => "Coraline", "img" => "imagens/coraline.jpg"],
            ["titulo" => "Cars", "img" => "imagens/carros.jpg"],
            ["titulo" => "Howl's Moving Castle", "img" => "imagens/castelo_animado.jpg", "nome" => "O castelo animado"],
            ["titulo" => "Puss in Boots: The Last Wish", "img" => "imagens/gato_de_botas.jpg", "nome" => "Gato de Botas 2"],
            ["titulo" => "Tarzan", "img" => "imagens/tarzan.jpg"],
            ["titulo" => "Tarza", "img" => "imagens/default.jpg", "nome" => "Erro Proposital"]
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

    <script src="index.js"></script>
</body>
<footer>
    <div class="footer-container">
        <p>
            <i class="fa-brands fa-whatsapp"></i> 
            <a href="https://wa.me/55XX999999999" target="_blank">+99 (99) 99999-9999 número propositalmente ilustrativo</a>
        </p>
        <p>
            <i class="fa fa-envelope"></i> 
            <a href="mailto:caeldavidsoares@gmail.com">caeldavidsoares@gmail.com</a>
        </p>
    </div>
</footer>
</html>
