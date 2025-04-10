<?php
// login.php

// Simulação de usuário e senha salvos (em um banco real, isso viria do BD)
$usuario_correto = "admin";
$senha_correta = "123456";

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST["usuario"];
    $senha = $_POST["senha"];

    // Verificação simples
    if ($usuario === $usuario_correto && $senha === $senha_correta) {
        echo "<p style='color:green;'>Login realizado com sucesso!</p>";
        // Aqui você poderia redirecionar para outra página:
        // header("Location: painel.php");
        // exit;
    } else {
        echo "<p style='color:red;'>Usuário ou senha incorretos.</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Login Simples</title>
</head>
<body>
    <h2>Login</h2>
    <form method="POST" action="login.php">
        <label for="usuario">Usuário:</label><br>
        <input type="text" id="usuario" name="usuario" required><br><br>

        <label for="senha">Senha:</label><br>
        <input type="password" id="senha" name="senha" required><br><br>

        <input type="submit" value="Entrar">
    </form>
</body>
</html>
