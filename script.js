//Chamada do prompt
const prompt = require('prompt-sync')();

//Variaveis
const jogoVelha = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

let vitoria = false;
let vencedor;
let jogada = 'X';

exibeTabela();
console.log();

// Estrutura principal do jogo
while (!vitoria) {
	console.log(`É a vez do jogador com (${jogada})`);

	const linhaDesejada = parseInt(prompt('Digite a linha desejada: '));
	const colunaDesejada = parseInt(prompt('Digite a coluna desejada: '));

	if (linhaDesejada < 0 || colunaDesejada < 0 || linhaDesejada > 2 || colunaDesejada > 2) {
		exibeTabela();
		console.log('Coordenada digitada inválida! Escolha valores de 0 a 2!\n');
		continue;
	}

	if (jogoVelha[linhaDesejada][colunaDesejada]) {
		exibeTabela();
		console.log('Coordenada digitada já está preenchida! Escolha outra!\n');
		continue;
	}

	jogoVelha[linhaDesejada][colunaDesejada] = jogada;

	//Muda a vez de quem joga
	if (jogada === 'X') {
		jogada = 'O';
	} else {
		jogada = 'X';
	}

	//Checa se todas as posições foram preenchidas e o jogo acaba no 0
	let coordenadasVazias = 0;

	for (let i = 0; i < jogoVelha.length; i++) {
		const linha = jogoVelha[i];
		for (let j = 0; j < linha.length; j++) {
			const jogadaAtual = linha[j];
			if (!jogadaAtual) {
				coordenadasVazias++;
			}
		}
	}

	if (coordenadasVazias === 0) {
		break;
	}
	exibeTabela();
	console.log();
	checaVencedor();
}

//Informa pros jogadores o resultado
if (vitoria) {
	console.log(`O jogador com (${vencedor}) venceu a partida!`);
} else {
	exibeTabela();
	console.log('\nA partida terminou em empate!');
}

// ------------------- FUNÇÕES ----------------------//

//Exibe a tabela do jogo com as jogadas
function exibeTabela() {
	console.clear();
	console.table(jogoVelha);
}

//Função que checa quem ganhou ou se houve empate
function checaVencedor() {
	//Lista de coordenadas que configura uma vitória
	const condicoesVitoria = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[2, 4, 6],
	];

	//Checa as coordenadas e verifica se alguma já atende as condições de vitória
	for (const condicaoVitoria of condicoesVitoria) {
		let qtdValoresIguais = 0;
		let ultimoValor;

		for (const coordenada of condicaoVitoria) {
			const linha = Math.floor(coordenada / 3);
			const coluna = coordenada % 3;

			const jogada = jogoVelha[linha][coluna];

			if (jogada && (!ultimoValor || jogada === ultimoValor)) {
				qtdValoresIguais++;
			}

			ultimoValor = jogada;
		}

		//Verifica se houve um vencedor
		if (qtdValoresIguais === 3) {
			vitoria = true;
			vencedor = ultimoValor;
			break;
		}
	}
}
