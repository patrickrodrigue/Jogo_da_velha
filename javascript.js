/**
 * Objeto `player1` representa o jogador 1 com o símbolo 'X' e a pontuação inicial de 0.
 */
const player1 = {
    symbol: 'X',
    score: 0
};

/**
 * Objeto `player2` representa o jogador 2 com o símbolo 'O' e a pontuação inicial de 0.
 */
const player2 = {
    symbol: 'O',
    score: 0
};

/**
 * Objeto `tic_tac_toe` representa um jogo da velha simples.
 * Este objeto contém funções e dados para iniciar, jogar e verificar o status do jogo.
 */
const tic_tac_toe = {

    // Array que representa o tabuleiro do jogo com nove células vazias.
    board: ['', '', '', '', '', '', '', '', ''],

    // Objeto que contém as opções de símbolos 'X' e 'O' e o índice atual do turno.
    symbols: {
        current_player: player1,
        change: function () {
            this.current_player = (this.current_player === player1 ? player2 : player1);
        }
    },

    // Elemento HTML que contém o jogo.
    container_element: null,

    // Variável que controla se o jogo terminou.
    gameover: false,

    // Sequências vencedoras no jogo da velha.
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    /**
     * Inicializa o jogo e associa-o a um elemento HTML específico.
     *
     * @param {HTMLElement} container - O elemento HTML onde o jogo será renderizado.
     */
    init: function (container) {
        this.container_element = container;
    },

    /**
     * Realiza uma jogada no jogo da velha.
     *
     * @param {number} position - A posição no tabuleiro onde a jogada será feita.
     * @returns {boolean} - Retorna verdadeiro se a jogada for válida, falso se não for.
     */
    make_play: function (position) {
        if (this.gameover) return false;
        if (this.board[position] === '') {
            this.board[position] = this.symbols.current_player.symbol;
            this.draw();
            let winning_sequences_index = this.check_winning_sequences(this.symbols.current_player.symbol);
            if (winning_sequences_index >= -0) {
                // Lógica para o fim do jogo quando uma sequência vencedora é encontrada.
            } else {
                if (this.board.every(cell => cell !== '')) {

                    document.getElementById('empate-img').style.display = 'block';

                    setTimeout(() => {
                        document.getElementById('empate-img').style.display = 'none';
                        this.start(); // Limpa o tabuleiro e inicia um novo jogo
                    }, 2500);
                } else {
                    this.symbols.change();
                }
            }
            return true;
        } else {
            return false;
        }
    },

    /**
     * Inicia um novo jogo da velha, limpando o tabuleiro e redefinindo o status do jogo.
     */
    start: function () {
        this.board.fill('');
        this.draw();
        this.gameover = false;
    },

    /**
     * Define o status do jogo como 'game over'.
     */
    game_is_over: function () {
        this.gameover = true;

    },

    /**
     * Verifica se alguma das sequências vencedoras foi alcançada por um jogador.
     *
     * @param {string} symbols - O símbolo ('X' ou 'O') do jogador atual.
     * @returns {number} - Retorna o índice da sequência vencedora ou -1 se não houver vencedor.
     */
    check_winning_sequences: function (symbols) {
        for (let i = 0; i < this.winning_sequences.length; i++) {
            if (this.board[this.winning_sequences[i][0]] == symbols &&
                this.board[this.winning_sequences[i][1]] == symbols &&
                this.board[this.winning_sequences[i][2]] == symbols) {
                console.log('Sequencia vencedora ' + i);

                // Atualiza a pontuação do jogador vencedor
                if (symbols === player1.symbol) {

                    player1.score++;
                } else if (symbols === player2.symbol) {
                    player2.score++;
                }
                const victoryMessage = symbols === player1.symbol ? document.getElementById('victoryone') : document.getElementById('victorytwo');
                victoryMessage.style.display = 'block';
                this.game_is_over()

                setTimeout(() => {
                    this.start();
                    victoryMessage.style.display = 'none'
                }, 2500);

                return i;
            }
        }
        return -1;
    },




    draw: function () {
        let content = '';

        for (let i = 0; i < this.board.length; i++) {
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
        }
        this.container_element.innerHTML = content;

        document.getElementById('player1-score').innerText = player1.score;
        document.getElementById('player2-score').innerText = player2.score;
    }
};


tic_tac_toe.init(document.getElementById('game-container'));
