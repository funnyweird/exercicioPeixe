var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var peixe;
var tubarao;
var posicaoAnteriorMouse = 0; // Armazena a última posição do mouse para detectar direção

function preload() {
    this.load.image('mar', 'assets/bg_azul-claro.png');

    // Carregar o logo
    this.load.image('logo', 'assets/logo-inteli_azul.png');

    // Carregar o peixe
    this.load.image('peixe', 'assets/peixes/peixinho_azul.png');

    // Carregar o tubarão
    this.load.image('tubarao', 'assets/peixes/tubarao.png');
}

function create() {
    this.add.image(400, 300, 'mar');

    // Adicionar o logo na tela
    this.add.image(400, 525, 'logo').setScale(0.5);

    // Adicionar o peixe na tela
    peixe = this.add.image(400, 300, 'peixe');

    // Adicionar o tubarão na tela
    tubarao = this.add.image(100, 100, 'tubarao').setScale(0.7);
}

function update() {
    // O peixe segue o mouse
    peixe.x = this.input.x;
    peixe.y = this.input.y;

    // **Verifica se o peixe está se movendo para a direita ou esquerda**
    if (this.input.x > posicaoAnteriorMouse) {
        peixe.setFlip(true, false); // Normal (virado para a direita)
    } else if (this.input.x < posicaoAnteriorMouse) {
        peixe.setFlip(false, false); // Virado para a esquerda
    }

    // Atualiza a posição anterior do mouse para a próxima verificação
    posicaoAnteriorMouse = this.input.x;

    // O tubarão persegue o peixe com suavidade
    var velocidade = 2;
    var angulo = Math.atan2(peixe.y - tubarao.y, peixe.x - tubarao.x);

    tubarao.x += Math.cos(angulo) * velocidade;
    tubarao.y += Math.sin(angulo) * velocidade;
}