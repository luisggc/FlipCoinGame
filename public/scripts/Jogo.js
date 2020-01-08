var isChrome = !!window.chrome
if (isChrome !== true) {
    alert("Por favor utilize o Google Chrome para acessar.\nAlgumas funcionalidades não estão disponíveis em navegadores antigos.")
}

function rotacionar() {
    var cara = document.getElementById('cara')
    var coroa = document.getElementById('coroa')
    quantidade_de_eventos_adicionais = apostar()
    var caiu_cara = quantidade_de_eventos_adicionais > 0

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

    x = nj.arange(0, jogo.lances + 1).tolist()
    randoms = nj.random([1, jogo.lances + 1]).tolist()[0]
    y = [jogo.saldo1]
    i = 0
    for (random of randoms) {
        i++
        if (random <= jogo.probabilidade_cara / 100) {
            quantidade_acontecimentos_adicionais++
            // ganhador
            y.push(y[i - 1] * (1 + jogo.ganho / 100))

        } else {
            quantidade_nao_acontecimentos_adicionais++
            y.push(y[i - 1] * (1 - jogo.perda / 100))
        }
    }

    //jogo.acontecimentos += quantidade_acontecimentos_adicionais
    //jogo.nao_acontecimentos += quantidade_nao_acontecimentos_adicionais

    jogo.acontecimentos_nao_acontecimentos = quantidade_acontecimentos_adicionais + " caras / " + quantidade_nao_acontecimentos_adicionais + " coroas"

    ultimo_saldo = Math.floor(y[y.length - 1])
    

    if (ultimo_saldo > 100000000000) {
        n = Math.floor(ultimo_saldo / 1000000000)
        alert("O saldo final é maior que 100 bilhões, portanto pode haver há adaptação do visual\nValor final foi cerca de: " + n + " bilhões")
        ultimo_saldo = n < 10000000000 ? 10000000000 : n
    }
    jogo["saldo1"] = ultimo_saldo
    console.log(jogo["saldo1"])
    updateGraph(x, y)


    return quantidade_acontecimentos_adicionais
}

function updateGraph(x, y) {
    myChart.data = {
        labels: x,
        datasets: [{
            label: 'Saldo',
            data: y,
            borderWidth: 1,
            pointRadius: 0,
            borderColor: "#fc0",
            backgroundColor: "#ffea99"
        }]
    }
    myChart.update()
}

function limpar() {
    jogo.acontecimentos_nao_acontecimentos = ""
    atualizarVisual()
}

function salvarConfig() {
    jogo = {
        ...jogo,
        //nome1: document.getElementById("nome1").value,
        saldo1: Number(document.getElementById("saldo1").value),
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
        //"label_jogador1": "Cara (" + jogo.nome1 + ")",
        "acontecimentos_nao_acontecimentos": jogo.acontecimentos_nao_acontecimentos,
        "label_saldo1": jogo.saldo1 // > 100000000000 ? 100000000000 : jogo.saldo1
    }

    jogo.probabilidade_coroa = 100 - jogo.probabilidade_cara

    for (let id in jogo) {
        if (jogo.hasOwnProperty(id) && id != "inner") {
            console.log(id)
            document.getElementById(id).value = jogo[id]
        }
    }
    for (let id in jogo.inner) {
        if (jogo.inner.hasOwnProperty(id)) {
            console.log(id)
            document.getElementById(id).innerHTML = jogo.inner[id]
        }
    }
}

function saldo_para_100() {
    jogo = {
        ...jogo,
        saldo1: 100
    }
    atualizarVisual()
}