
const envelope = document.getElementById("envelope");
const fechar = document.getElementById("fechar");
const instrucao = document.getElementById("instrucao");

const musica = document.getElementById("musica");
const botaoMusica = document.getElementById("botaoMusica");

const coracoes = document.getElementById("coracoes");

let temporizadorFechar;

// ABRIR CARTA

function abrirCarta() {

    clearTimeout(temporizadorFechar);

    document.body.classList.remove("recolhendo");

    envelope.classList.add("aberto");
    document.body.classList.add("carta-aberta");

    envelope.setAttribute("aria-expanded", "true");

    instrucao.textContent = "Uma mensagem especial para você ❤️";

}

// FECHAR CARTA

function fecharCarta() {

    if (!envelope.classList.contains("aberto")) {
        return;
    }

    document.body.classList.add("recolhendo");

    instrucao.textContent = "Guardando nossas lembranças... ❤️";

    temporizadorFechar = setTimeout(() => {

        envelope.classList.remove("aberto");

        document.body.classList.remove("carta-aberta");
        document.body.classList.remove("recolhendo");

        envelope.setAttribute("aria-expanded", "false");

        instrucao.textContent = "Clique na cartinha para abrir";

    }, 850);

}

// CLIQUE NO ENVELOPE

envelope.addEventListener("click", (evento) => {

    if (evento.target.closest("#fechar")) {
        return;
    }

    if (!envelope.classList.contains("aberto")) {
        abrirCarta();
    }

});

// BOTÃO DE FECHAR

fechar.addEventListener("click", (evento) => {
    evento.stopPropagation();
    fecharCarta();
});

// ACESSIBILIDADE PELO TECLADO

envelope.addEventListener("keydown", (evento) => {

    if (
        (evento.key === "Enter" || evento.key === " ") &&
        evento.target === envelope
    ) {
        evento.preventDefault();

        if (!envelope.classList.contains("aberto")) {
            abrirCarta();
        }
    }

});

// CARREGAR FOTOS DAS POLAROIDS

const fotos = document.querySelectorAll(".foto-real");

fotos.forEach((foto) => {

    const placeholder = foto.previousElementSibling;

    function mostrarFoto() {
        foto.style.display = "block";
        placeholder.style.display = "none";
    }

    foto.addEventListener("load", mostrarFoto);

    foto.addEventListener("error", () => {
        foto.style.display = "none";
        placeholder.style.display = "flex";
    });

    if (foto.complete && foto.naturalWidth > 0) {
        mostrarFoto();
    }

});

// MÚSICA

botaoMusica.addEventListener("click", async () => {

    if (musica.paused) {

        try {
            await musica.play();
            botaoMusica.textContent = "♫ Pausar música";
        } catch (erro) {
            botaoMusica.textContent = "Não foi possível tocar";
        }

    } else {

        musica.pause();
        botaoMusica.textContent = "♫ Tocar música";

    }

});

// CORAÇÕES FLUTUANTES

function criarCoracao() {

    const coracao = document.createElement("span");

    coracao.classList.add("coracao-flutuante");

    coracao.innerHTML = "♥";

    coracao.style.left = Math.random() * 100 + "vw";

    coracao.style.fontSize =
        Math.random() * 20 + 12 + "px";

    coracao.style.animationDuration =
        Math.random() * 4 + 5 + "s";

    coracoes.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, 9000);

}

setInterval(criarCoracao, 700);