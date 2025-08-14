<script lang="ts">
	import ApexVelas from '$lib/componentes/ApexVelas.svelte';
	import { funcaoAlpacaParaApex } from '$lib/functions/apex/funcaoAlpacaParaApex';
	import { funcaoCriarMediaMovelApex } from '$lib/functions/apex/funcaoCriarMediaMovelApex';
	// import { funcaoCriarRsiApex } from '$lib/functions/apex/funcaoCriarRsiApex';
	import type { typeDadoAlpaca } from '$lib/types/alpaca/typeDadoAlpaca';
	import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
	import type { typeLinhaApex } from '$lib/types/apex/typeLinhaApex';
	import type { typeVelaApex } from '$lib/types/apex/typeVelaApex';
	import { funcaoFetch } from './funcaoFetch';

	let {
		agora,
		simbolo,
		periodo = '1Day',
		quantidade,
	}: {
		agora: Date;
		simbolo: string;
		periodo?: typePeriodoAlpaca;
		quantidade: number;
	} = $props();

	let velas = $state<typeVelaApex[]>();
	let mediasmoveis = $state<typeLinhaApex[]>([]);
	// let rsi = $state<typeLinhaApex[]>([]);

	function funcaoCalcularMediasMoveis() {
		if (velas === undefined) return;
		mediasmoveis[0] = {
			descricao: 'MÉDIA MÓVEL SIMPLES (5)',
			cor: 'blue',
			pontos: funcaoCriarMediaMovelApex({
				velas,
				periodo: 5,
			}),
		};
		mediasmoveis[1] = {
			descricao: 'MÉDIA MÓVEL SIMPLES (10)',
			cor: 'red',
			pontos: funcaoCriarMediaMovelApex({ velas, periodo: 10 }),
		};
	}

	// function funcaoCalcularRsi() {
	// 	if (velas === undefined) return;
	// 	rsi[0] = {
	// 		opcoes: {
	// 			color: 'red',
	// 			lineStyle: 2,
	// 			lineWidth: 2,
	// 		},
	// 		dados: funcaoCriarRsiApex({
	// 			velas,
	// 			periodo: 5,
	// 		}),
	// 	};
	// 	rsi[1] = {
	// 		opcoes: {
	// 			color: 'orange',
	// 			lineStyle: 2,
	// 			lineWidth: 2,
	// 		},
	// 		dados: funcaoCriarRsiApex({ velas, periodo: 10 }),
	// 	};
	// }

	async function funcaoPreencherVelas() {
		const dados_sem_tipagem = await funcaoFetch({
			periodo,
			quantidade,
			simbolo,
		});
		const arrayDadosAlpaca = dados_sem_tipagem as typeDadoAlpaca[];
		const arrayVelasApex = await funcaoAlpacaParaApex(arrayDadosAlpaca);
		velas = arrayVelasApex;
		funcaoCalcularMediasMoveis();
	}

	let minuto = $derived(agora.getMinutes());
	let hora = $derived(agora.getHours());

	$effect(() => {
		if (periodo === '1Min') {
			void minuto;
			funcaoPreencherVelas();
			console.log(`ATINGIU PERIODO DE 1 MINUTO`);
		} else if (periodo === '5Min') {
			if (minuto % 5 !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 5 MINUTOS');
		} else if (periodo === '15Min') {
			if (minuto % 15 !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 15 MINUTOS');
		} else if (periodo === '1Hour') {
			if (minuto !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 1 HORA');
		} else if (periodo === '1Day') {
			if (hora !== 21 || minuto !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 1 HORA');
		}
	});
</script>

<div>
	{simbolo} ({periodo})
</div>

{#await funcaoPreencherVelas()}
	<div>CARREGANDO...</div>
{:then}
	<ApexVelas velas={velas as typeVelaApex[]} linhas={mediasmoveis} />
{/await}
