<script lang="ts">
	import LightweightVelas from '$lib/componentes/LightweightVelas.svelte';
	import { funcaoAlpacaParaLightweight } from '$lib/functions/lightweight/funcaoAlpacaParaLightweight';
	import { funcaoVelasLightWeight } from '$lib/functions/lightweight/funcaoVelasLightweight';
	import type { typeDadoAlpaca } from '$lib/types/alpaca/typeDadoAlpaca';
	import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
	import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';

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

	let estadoVelas = $state<typeVelaLightWeight[]>();

	async function funcaoLerDados() {
		const resposta = await fetch(
			`/examples/alpaca-lightweight-acoes?simbolo=${simbolo}&periodo=${periodo}&quantidade=${quantidade}`,
		);
		return await resposta.json();
	}

	async function funcaoPreencherVelas() {
		const dados_sem_tipagem = await funcaoLerDados();
		const arrayDadosAlpaca = dados_sem_tipagem as typeDadoAlpaca[];
		const arrayDadosLightWeight = await funcaoAlpacaParaLightweight(arrayDadosAlpaca);
		const arrayVelasLightweigth = funcaoVelasLightWeight(arrayDadosLightWeight);
		estadoVelas = arrayVelasLightweigth;
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

{#await funcaoPreencherVelas()}
	<div>CARREGANDO...</div>
{:then}
	<div>
		{simbolo} ({periodo})
	</div>
	<LightweightVelas velas={estadoVelas as typeVelaLightWeight[]} />
{/await}
