class Jogador { // Classe que representa o jogador
    constructor(nome) {
        // Inicializa o nome do jogador e o XP
        this.nome = nome;
        this.xp = 0;
    }

    obterClassificacao() {  // Método que retorna a classificação do jogador com base no XP acumulado
        if (this.xp < 1000) {
            return "Ferro";
        } else if (this.xp >= 1000 && this.xp <= 2000) {
            return "Bronze";
        } else if (this.xp >= 2001 && this.xp <= 5000) {
            return "Prata";
        } else if (this.xp >= 5001 && this.xp <= 7000) {
            return "Ouro";
        } else if (this.xp >= 7001 && this.xp <= 8000) {
            return "Platina";
        } else if (this.xp >= 8001 && this.xp <= 9000) {
            return "Ascendente";
        } else if (this.xp >= 9001 && this.xp <= 10000) {
            return "Imortal";
        } else {
            return "Radiante";
        }
    }

    ganharXP(xpGanho) { // Método que aumenta o XP do jogador
        this.xp += xpGanho;
    }
}

class Goblin {  // Classe que representa um Goblin
    constructor(numero) {   
        // Inicializa o número do Goblin e a vida (HP)
        this.numero = numero;
        this.hp = 25; // Vida do Goblin
    }

    receberDano(dano) { // Método que reduz a vida do Goblin quando ele recebe dano
        this.hp -= dano;
    }

    estaVivo() {    // Método que verifica se o Goblin ainda está vivo
        return this.hp > 0;
    }
}

class Jogo {    // Classe que controla o jogo
    constructor(jogador) {
        // Inicializa o jogador e configurações do jogo
        this.jogador = jogador;
        this.totalGoblins = 10;
        // Valor mínimo e máximo de rolagem do dado
        this.minRoll = 1;
        this.maxRoll = 20;
        // Valor mínimo e máximo que o jogador pode causar
        this.minDmg = 8;
        this.maxDmg = 14;
    }

    rolarDado(min, max) {   // Função para simular a rolagem de dados
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    iniciar() { // Método que inicia o jogo
        console.log("----------------------------------------------------------------------------------");
        console.log(this.jogador.nome + " entrou em um covil de Goblins! Boa Sorte Aventureiro!");
        console.log("----------------------------------------------------------------------------------");

        for (let i = 1; i <= this.totalGoblins; i++) {  // Laço que controla o combate contra cada goblin
            let goblin = new Goblin(i); // Cria um novo Goblin para cada iteração
            console.log("O combate contra o " + i + "° Goblin começa!");

            let turnos = 5; // Número máximo de turnos por goblin

            while (goblin.estaVivo() && turnos > 0) {   // Enquanto o Goblin estiver vivo e o jogador ainda tiver turnos
                let roll = this.rolarDado(this.minRoll, this.maxRoll);  // Rola o dado para determinar se o ataque acerta
                let rollDmg = this.rolarDado(this.minDmg, this.maxDmg); // Rola o dado para determinar o dano do ataque

                console.log("----------------------------------------------------------------------------------");
                console.log("O valor da rolagem é: " + roll);

                let valorJogada = roll + 7; // Adiciona o modificador de ataque
                let critico = rollDmg * 3;  // Multiplicador do dano caso seja crítico
                console.log("Somando a rolagem com o modificador fica: " + valorJogada);

                // Condições de acerto
                if (valorJogada >= 12 && roll < 20) {   // Acerto normal
                    console.log(this.jogador.nome + " acertou o Goblin! Seu dano foi: " + rollDmg);
                    goblin.receberDano(rollDmg);    // Aplica o dano normal
                } else if (roll === 20) {   // Acerto crítico
                    console.log(this.jogador.nome + " tirou um acerto crítico! Seu dano foi: " + critico);
                    goblin.receberDano(critico);    // Aplica o dano crítico
                } else {    // Errou o ataque
                    console.log(this.jogador.nome + " errou o golpe no Goblin...");
                }

                if (!goblin.estaVivo()) {   // Condição de vitória
                    let xpGanho = this.rolarDado(700, 1200);    // Gera uma quantidade aleatória de XP entre 7Feli00 e 1200
                    this.jogador.ganharXP(xpGanho);     // Aumenta o XP do jogador
                    console.log(this.jogador.nome + " derrotou o " + i + "° Goblin e ganhou " + xpGanho + " de XP!");
                    console.log("O Héroi de nome " + this.jogador.nome + " está no nível de " + this.jogador.obterClassificacao());
                    console.log("----------------------------------------------------------------------------------");
                    break;  // Termina o combate contra este goblin e passa para o próximo
                }

                turnos--;   // Reduz o número de turnos restantes
            }

            if (goblin.estaVivo()) {    // Condição de derrota
                console.log(this.jogador.nome + " não foi forte o bastante...");
                console.log("O Héroi de nome " + this.jogador.nome + " está no nível de " + this.jogador.obterClassificacao());
                console.log("----------------------------------------------------------------------------------");
                break;  // Termina o jogo se o jogador for derrotado
            }
        }
    }
}

// Função que inicializa o jogo pedindo o nome do jogador
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Digite o nome do jogador: ', nome => {
    let jogador = new Jogador(nome);    // Cria um novo jogador com o nome digitado
    let jogo = new Jogo(jogador);   // Inicia o jogo com o jogador criado
    jogo.iniciar(); // Inicia o jogo
    readline.close();   // Fecha o input após o nome ser inserid
});