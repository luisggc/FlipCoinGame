var isChrome = !!window.chrome
if (isChrome !== true) {
    alert("Por favor utilize o Google Chrome para acessar.\nAlgumas funcionalidades não estão disponíveis em navegadores antigos.")
}

function rotacionar() {
    var cara = document.getElementById('cara')
    var coroa = document.getElementById('coroa')
    var caiu_cara = apostar() > 0

    cara.className = 'coin-heads rotation visible'
    coroa.classList = 'coin-tails rotation visible'

    setTimeout(function() {
        if (caiu_cara) {
            cara.className = 'coin-heads visible'
            coroa.classList = 'coin-tails hide'
        } else {
            cara.className = 'coin-heads hide'
            coroa.classList = 'coin-tails visible'
        }
        atualizarVisual()
    }, 1000);
}

function apostar() {
    limpar()
    var quantidade_acontecimentos_adicionais = 0
    var quantidade_nao_acontecimentos_adicionais = 0

    for (var i = 0; i < jogo.lances; i++) {
        random = Math.random()
        if (random <= jogo.probabilidade_cara / 100) {
            quantidade_acontecimentos_adicionais++
        } else {
            quantidade_nao_acontecimentos_adicionais++
        }
    }
    jogo.acontecimentos += quantidade_acontecimentos_adicionais
    jogo.nao_acontecimentos += quantidade_nao_acontecimentos_adicionais

    var ganhador = (quantidade_acontecimentos_adicionais > 0) ? "1" : "2"
    var perdedor = ganhador == "2" ? "1" : "2"

    jogo["saldo" + ganhador] = Math.floor(jogo["saldo" + ganhador] * (1 + jogo.ganho / 100))
    jogo["saldo" + perdedor] = Math.floor(jogo["saldo" + perdedor] * (1 - jogo.perda / 100))

    return quantidade_acontecimentos_adicionais
}

function limpar() {
    jogo.acontecimentos = 0
    jogo.nao_acontecimentos = 0
    atualizarVisual()
}

function salvarConfig() {
    jogo = {
        ...jogo,
        nome1: document.getElementById("nome1").value,
        saldo1: Number(document.getElementById("saldo1").value),
        nome2: document.getElementById("nome2").value,
        saldo2: Number(document.getElementById("saldo2").value),
        ganho: Number(document.getElementById("ganho").value),
        perda: Number(document.getElementById("perda").value)
    }
    atualizarVisual()
}

function atualizarJogo(id, modify = function(value) { return value }) {
    console.log(id)
    jogo[id] = modify(document.getElementById(id).value)
    atualizarVisual()
}

function atualizarVisual() {
    console.log(jogo)
    jogo.inner = {
        "label_jogador1": "Cara (" + jogo.nome1 + ")",
        "label_jogador2": "Coroa (" + jogo.nome2 + ")",
        "acontecimentos": jogo.acontecimentos,
        "nao_acontecimentos": jogo.nao_acontecimentos,
        "label_saldo1": jogo.saldo1,
        "label_saldo2": jogo.saldo2
    }


    for (let id in jogo) {
        if (jogo.hasOwnProperty(id) && id != "inner") {
            document.getElementById(id).value = jogo[id]
        }
    }
    for (let id in jogo.inner) {
        if (jogo.inner.hasOwnProperty(id)) {
            document.getElementById(id).innerHTML = jogo.inner[id]
        }
    }
}