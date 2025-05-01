<script lang="ts">
	import LightweightVelas from '$lib/componentes/LightweightVelas.svelte';
	import { funcaoSegundosRestantes } from '$lib/functions/alpaca/funcaoSegundosRestantes';
	import { funcaoAlpacaParaLightweight } from '$lib/functions/funcaoAlpacaParaLightweight';
	import { funcaoVelasLightWeight } from '$lib/functions/lightweight/funcaoVelasLightweight';
	import type { typeDadoAlpaca } from '$lib/types/alpaca/typeDadoAlpaca';
	// import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
	import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';

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

	$effect(() => {
		const primeiro_intervalo = setInterval(
			funcaoPreencherVelas,
			funcaoSegundosRestantes({ periodo, agora }) * 1000,
		);
		return () => clearInterval(primeiro_intervalo); // LIMPA AO DESMONTAR.
	});

	async function funcaoPreencherVelas() {
		const dados_sem_tipagem = await funcaoLerDados();
		const arrayDadosAlpaca = dados_sem_tipagem as typeDadoAlpaca[];
		const arrayDadosLightWeight = await funcaoAlpacaParaLightweight(arrayDadosAlpaca);
		const arrayVelasLightweigth = funcaoVelasLightWeight(arrayDadosLightWeight);
		estadoVelas = arrayVelasLightweigth;
	}

	async function funcaoLerDados() {
		const resposta = await fetch(
			`/examples/alpaca-lightweight-cripto?simbolo=${simbolo}&periodo=${periodo}&quantidade=${quantidade}`,
		);
		return await resposta.json();
	}
</script>

{#await funcaoPreencherVelas()}
	<div>CARREGANDO...</div>
{:then}
	<div>
		{simbolo} ({periodo})
	</div>
	<LightweightVelas velas={estadoVelas as typeVelaLightWeight[]} />
{/await}
