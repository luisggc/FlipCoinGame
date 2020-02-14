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

    nome_jogadores = nj.arange(1, jogo.quantidade_de_jogadores + 1).tolist()

    y_array = nome_jogadores.map((jogador, index) => {
        y = [jogo.saldo_geral[index]]
        i = 0
        randoms = nj.random([1, jogo.lances + 1]).tolist()[0]
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
        return y
    })

    jogo.acontecimentos_nao_acontecimentos = quantidade_acontecimentos_adicionais-1 + " caras / " + quantidade_nao_acontecimentos_adicionais + " coroas"

    ultimo_saldos = nome_jogadores.map((jogador, index) => {
        y_unique = y_array[index]
        ultimo_saldo = Math.floor(y_unique[y_unique.length - 1])
        if (ultimo_saldo > 1000000) {
            n = Math.floor(ultimo_saldo / 1000000)
            ultimo_saldo = 999999
        }
        return ultimo_saldo
    })
    if(Math.max.apply(null, ultimo_saldos)==999999){
        alert("O saldo final de um dos jogadore é maior que 1 milhão, portanto pode haver adaptação do visual\nValor final foi cerca de: " + n + " milhões")
    }
    jogo["saldo_geral"] = ultimo_saldos
    updateGraph(x, y_array)

    return quantidade_acontecimentos_adicionais
}

color_border = [
    "#FFCC00",
    "#0009B3",
    "#B38F00",
    "#7f84d9",
    "#b30009",
    "#09b300",
]

function updateGraph(x, y_array) {
    myChart.data = {
        labels: x,
        datasets: y_array.map((y_value, index) =>
            ({
                label: 'Saldo do jogador ' + (index + 1),
                data: y_value,
                borderWidth: 1,
                pointRadius: 0,
                borderColor: color_border[index],
                backgroundColor: jogo.quantidade_de_jogadores == 1 ? "#ffea99" : "transparent"
            }))
    }
    myChart.update()
}

function limpar() {
    jogo.acontecimentos_nao_acontecimentos = ""
    atualizarVisual()
}

function salvarConfig() {
    quantidade_de_jogadores = Number(document.getElementById("quantidade_de_jogadores").value)
    if (quantidade_de_jogadores<1 || quantidade_de_jogadores>6){
        alert("Selecione no máximo 6 jogadores.")
        return
    }
    jogo = {
        ...jogo,
        quantidade_de_jogadores: quantidade_de_jogadores,
        saldo1: [Number(document.getElementById("saldo1").value)],
        ganho: Number(document.getElementById("ganho").value),
        perda: Number(document.getElementById("perda").value),
        saldo_geral: new Array(Number(document.getElementById("quantidade_de_jogadores").value)).fill(Number(document.getElementById("saldo1").value))
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
        "acontecimentos_nao_acontecimentos": jogo.acontecimentos_nao_acontecimentos
    }
    jogo.probabilidade_coroa = 100 - jogo.probabilidade_cara

    visual_elemento_do_saldo = document.getElementById("visual_elemento_do_saldo")
    
    visual_elemento_do_saldo.innerHTML = jogo["saldo_geral"].map((saldo, index) => (
        `${index+1}.<div class="odometer custom_odometer" id="saldo_do_jogador${index}">${saldo}</div><br>`
    )).join("\n")
        

    jogo["saldo_geral"].map((saldo, index) => {
        var el = document.getElementById(`saldo_do_jogador${index}`);
        var new_odo = new Odometer({
            el: el
        });
        $(`#saldo_do_jogador${index}`).html(saldo)
    })

    //document.getElementById("saldo1").value = jogo.saldo_geral[0]
    
    for (let id in jogo) {
        if (jogo.hasOwnProperty(id) && id != "inner" && id!='saldo_geral') {
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

function saldo_visivel(is_visible) {
    var saldo_visual = document.getElementById('label_jogador1')
    if (is_visible) {
        saldo_visual.className = 'visible'
    } else {
        saldo_visual.className = 'hide'
            //coroa.classList = 'coin-tails visible'
    }
}

function saldo_para_100() {
    jogo = {
        ...jogo,
        saldo_geral: jogo.saldo_geral.map(_ => 100),
        saldo1: 100
    }
    atualizarVisual()
}