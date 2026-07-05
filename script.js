const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");
const senhaInput = document.getElementById("senha");
const forcaDiv = document.getElementById("forca");
const combinacoesDiv = document.getElementById("combinacoes");

const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*()-_=+[]{}<>?";

tamanho.addEventListener("input", () => {
    valorTamanho.textContent = tamanho.value;
});

function gerarSenha() {
    let caracteres = "";

    if (document.getElementById("maiusculas").checked) {
        caracteres += maiusculas;
    }
    if (document.getElementById("minusculas").checked) {
        caracteres += minusculas;
    }
    if (document.getElementById("numeros").checked) {
        caracteres += numeros;
    }
    if (document.getElementById("simbolos").checked) {
        caracteres += simbolos;
    }

    if (caracteres === "") {
        alert("Selecione pelo menos uma opção!");
        return;
    }

    let senha = "";
    let n = parseInt(tamanho.value);

    for (let i = 0; i < n; i++) {
        let rand = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[rand];
    }

    senhaInput.value = senha;

    avaliarForca(senha);
    calcularCombinacoes(caracteres.length, n);
}

function avaliarForca(senha) {
    let pontos = 0;

    if (senha.length >= 12) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    let texto = "";

    if (pontos <= 2) {
        texto = "🔴 Senha Fraca";
        forcaDiv.style.color = "red";
    } else if (pontos <= 4) {
        texto = "🟡 Senha Média";
        forcaDiv.style.color = "orange";
    } else {
        texto = "🟢 Senha Forte";
        forcaDiv.style.color = "green";
    }

    forcaDiv.textContent = texto;
}

function calcularCombinacoes(base, tamanho) {
    let total = Math.pow(base, tamanho);

    combinacoesDiv.textContent =
        "Possibilidades aproximadas: " + total.toExponential(2);
}

function copiarSenha() {
    navigator.clipboard.writeText(senhaInput.value);
    alert("Senha copiada!");
}
