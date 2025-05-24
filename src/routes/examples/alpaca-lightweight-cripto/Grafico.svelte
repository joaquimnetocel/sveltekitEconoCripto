<script lang="ts">
	import LightweightVelas from '$lib/componentes/LightweightVelas.svelte';
	import { funcaoAlpacaParaLightweight } from '$lib/functions/lightweight/funcaoAlpacaParaLightweight';
	import { funcaoVelasLightWeight } from '$lib/functions/lightweight/funcaoVelasLightweight';
	import type { typeDadoAlpaca } from '$lib/types/alpaca/typeDadoAlpaca';
	import type { typeLinhaLightweight } from '$lib/types/lightweight/typeLinhaLightweight';
	import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';
	import { SMA } from 'technicalindicators';

	let {
		agora,
		simbolo,
		periodo,
		quantidade,
	}: {
		agora: Date;
		simbolo: string;
		periodo: string;
		quantidade: number;
	} = $props();

	let estadoVelas = $state<typeVelaLightWeight[]>();
	let linhas = $state<typeLinhaLightweight[]>([]);

	function funcaoCriarMediaMovel(periodo: number): typeLinhaLightweight['dados'] {
		if (estadoVelas === undefined) return [];
		const fechamentos = estadoVelas.map((current) => current.close);
		const mediasmoveis = SMA.calculate({ period: periodo, values: fechamentos });
		const velasnaoqueimadas = estadoVelas.slice(periodo - 1);
		return velasnaoqueimadas.map((current, i) => {
			return {
				time: current.time,
				value: mediasmoveis[i],
			};
		});
	}

	function funcaoCalcularMediasMoveis() {
		if (estadoVelas === undefined) return;
		linhas[0] = {
			opcoes: {
				color: 'red',
				lineStyle: 2,
				lineWidth: 2,
			},
			dados: funcaoCriarMediaMovel(5),
		};
		linhas[1] = {
			opcoes: {
				color: 'orange',
				lineStyle: 2,
				lineWidth: 2,
			},
			dados: funcaoCriarMediaMovel(10),
		};
	}

	async function funcaoDados() {
		const dados_sem_tipagem = await funcaoLerDados();
		const arrayDadosAlpaca = dados_sem_tipagem as typeDadoAlpaca[];
		const arrayDadosLightWeight = await funcaoAlpacaParaLightweight(arrayDadosAlpaca);
		const arrayVelasLightweigth = funcaoVelasLightWeight(arrayDadosLightWeight);
		estadoVelas = arrayVelasLightweigth;
		funcaoCalcularMediasMoveis();
	}

	async function funcaoLerDados() {
		const resposta = await fetch(
			`/examples/alpaca-lightweight-cripto?simbolo=${simbolo}&periodo=${periodo}&quantidade=${quantidade}`,
		);
		return await resposta.json();
	}

	let minuto = $derived(agora.getMinutes());
	let hora = $derived(agora.getHours());

	$effect(() => {
		if (periodo === '1Min') {
			void minuto;
			funcaoDados();
			console.log(`ATINGIU PERIODO DE 1 MINUTO`);
		} else if (periodo === '5Min') {
			if (minuto % 5 !== 1) return;
			funcaoDados();
			console.log('ATINGIU PERIODO DE 5 MINUTOS');
		} else if (periodo === '15Min') {
			if (minuto % 15 !== 1) return;
			funcaoDados();
			console.log('ATINGIU PERIODO DE 15 MINUTOS');
		} else if (periodo === '1Hour') {
			if (minuto !== 1) return;
			funcaoDados();
			console.log('ATINGIU PERIODO DE 1 HORA');
		} else if (periodo === '1Day') {
			if (hora !== 21 || minuto !== 1) return;
			funcaoDados();
			console.log('ATINGIU PERIODO DE 1 HORA');
		}
	});
</script>

<div>
	{simbolo} ({periodo})
</div>

{#await funcaoDados()}
	<div>CARREGANDO...</div>
{:then}
	<LightweightVelas velas={estadoVelas as typeVelaLightWeight[]} {linhas} />
{/await}
