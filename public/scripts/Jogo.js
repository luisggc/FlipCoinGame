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
    jogo["cada_jogada"] = y_array
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
    "#fcba03",
    "#8f8260",
    "#5e6b8f",
    "#79489c",
    "#8a3b75",
    "#873540",
    "#915c33",
        "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
        "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
        "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
        "#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
        "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
        "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
        "#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
        "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
        "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
        "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
        "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
        "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
        "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
        "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
        "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
        "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
        "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
        "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
        "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
        "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
        "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
        "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
        "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
        "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
        "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
        "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
        "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
        "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
        "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
        "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
        "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
        "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
        "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
        "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
        "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
        "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
        "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
        "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
        "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
        "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
]

function updateGraph(x, y_array) {

    datasets = y_array.map((y_value, index) =>
    ({
        label: jogo.quantidade_de_jogadores < 11 ? 'Jogador ' + (index + 1) : "",
        data: y_value,
        borderWidth: 1,
        pointRadius: 0,
        borderColor: color_border[index],
        backgroundColor: jogo.quantidade_de_jogadores == 1 ? "#ffea99" : "transparent"
    }))

    myChart.data = {
        labels: x,
        datasets: [
            {
                label: "Saldo inicial",
                data: y_array[0].map(_ => y_array[0][0]),
                borderWidth: 1,
                pointRadius: 0,
                borderColor: "#ff3420"
            },
            ...datasets
        ]
    }
    myChart.update()
}

function limpar() {
    jogo.acontecimentos_nao_acontecimentos = ""
    atualizarVisual()
}

function salvarConfig() {
    quantidade_de_jogadores = Number(document.getElementById("quantidade_de_jogadores").value)
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
    saldo_texto = document.getElementById("label_jogador1")
    saldo_raw_texto = document.getElementById("saldo_raw_texto")

    if(("cada_jogada" in jogo)){
        if (jogo["saldo_geral"].length<7){
            saldo_texto.innerHTML = "Saldo"
            visual_elemento_do_saldo.innerHTML = jogo.cada_jogada.map((saldo, index) => {
                saldo_final = Math.floor(saldo[saldo.length-2])
                return (
                `${index+1}.<div class="odometer custom_odometer" id="saldo_do_jogador${index}">${saldo_final}</div><br>`
            )}).join("\n")
                
            jogo.cada_jogada.map((saldo, index) => {
                var el = document.getElementById(`saldo_do_jogador${index}`);
                var new_odo = new Odometer({
                    el: el
                });
                $(`#saldo_do_jogador${index}`).html(Math.floor(saldo[saldo.length-2]))
            })
        }else{
            saldo_texto.innerHTML = ""
            visual_elemento_do_saldo.innerHTML = ""
                texto_do_raw_texto = jogo.cada_jogada.map((saldo, index) => (
                    `<div>Jogador ${index+1}: ${Math.floor(saldo[saldo.length-2])} (saldo máx: ${Math.floor(Math.max(...saldo))})</div>`
                )).join("")

                saldo_raw_texto.innerHTML = `</br></br>Saldo final dos jogadores:</br></br>${texto_do_raw_texto}`
        }
    }

    //document.getElementById("saldo1").value = jogo.saldo_geral[0]
    
    for (let id in jogo) {
        if (jogo.hasOwnProperty(id) && id != "inner" && id!='saldo_geral' && id!='cada_jogada') {
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