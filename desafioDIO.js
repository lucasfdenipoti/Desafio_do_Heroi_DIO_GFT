console.clear()

// Mínimo e Máximo do dado de 20 lados
let minRoll = 1
let maxRoll = 20
// Dano mínimo e máximo
let minDmg = 8
let maxDmg = 14
let xp = 0 // XP inicial
let countTurnos = 5    // Quantidade de combates
let totalGoblins = 10  // Quantidade de goblins

function obterClassificacao(xp) {
    if (xp < 1000) {
        return "Ferro"
    } else if (xp > 1001 && xp < 2000) {
        return "Bronze"
    } else if (xp > 2001 && xp < 5000) {
        return "Prata"
    } else if (xp > 5001 && xp < 7000) {
        return "Ouro"
    } else if (xp > 7001 && xp < 8000) {
        return "Platina"
    } else if (xp > 8001 && xp < 9000) {
        return "Ascendente"
    } else if (xp > 9001 && xp < 10000) {
        return "Imortal"
    } else 
        return "Radiante"  
}

console.log("----------------------------------------------------------------------------------")
console.log("Você entrou em um covil de Goblins! Boa Sorte Aventureiro!")
console.log("----------------------------------------------------------------------------------")

for (let i = 1; i <= totalGoblins; i++) {
    console.log("O combate contra o " + i + "° Goblin começa!")
    let goblinHp = 25  // Vida de cada goblin
    let countTurnos = 5   // Resetar o número de tentativas a cada goblin

    while (goblinHp > 0 && countTurnos > 0) {
        let roll = Math.floor(Math.random() * (maxRoll - minRoll + 1)) + minRoll   // Número aleatório de 1 a 20 para simular o dado de acerto do ataque
        let rollDmg = Math.floor(Math.random() * (maxDmg - minDmg + 1)) + minDmg   // Número aleatório para definir o dano do ataque ao acertar

        console.log("----------------------------------------------------------------------------------")
        console.log("O valor da rolagem é: " + roll)
        let valorJogada = roll + 7  // Adiciona um modificador a jogada de ataque
        let critico = rollDmg * 3  // Multiplicador do dano crítico
        console.log("Somando a rolagem com o modificador fica: " + valorJogada)

        // Combate
        if (valorJogada >= 12 && roll < 20) {   // Acerto normal
            console.log("Você acertou o Goblin! Seu dano foi: " + rollDmg)
            goblinHp -= rollDmg
        } else if (roll == 20) {    // Acerto crítico
            console.log("Você tirou um acerto crítico! Seu dano foi: " + critico)
            goblinHp -= critico
        } else  // Errou o golpe
            console.log("Você errou o golpe no Goblin...")

        // Condição de vitória
        if (goblinHp <= 0) {
            let xpGanho = Math.floor(Math.random() * 701) + 500 // XP aleatório entre 500 e 1200
            xp += xpGanho
            let classificacao = obterClassificacao(xp) // Chamar a função para obter a classificação
            console.log("Você derrotou o " + i + "° Goblin e ganhou " + xpGanho + " de XP!")
            console.log("XP total: " + xp + " | Classificação: " + classificacao)
            console.log("----------------------------------------------------------------------------------")
            break
        }

        countTurnos--;
    }

    // Condição de derrota
    if (goblinHp > 0) {
        let classificacao = obterClassificacao(xp) // Chamar a função para obter a classificação
        console.log("Você não foi forte o bastante...")
        console.log("XP total: " + xp + " | Classificação: " + classificacao)
        console.log("----------------------------------------------------------------------------------")
        break
    }
}