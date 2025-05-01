<script lang="ts">
	import LightweightVelas from '$lib/componentes/LightweightVelas.svelte';
	import { funcaoSegundosRestantes } from '$lib/functions/alpaca/funcaoSegundosRestantes';
	import { funcaoAlpacaParaLightweight } from '$lib/functions/funcaoAlpacaParaLightweight';
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

	$effect(() => {
		const intervalo = setInterval(
			funcaoLerDados,
			funcaoSegundosRestantes({ periodo, agora }) * 1000,
		);
		return () => clearInterval(intervalo); // LIMPA AO DESMONTAR.
	});

	async function funcaoLerDados() {
		const resposta = await fetch(
			`/examples/alpaca-apex-cripto?simbolo=${simbolo}&periodo=${periodo}&quantidade=${quantidade}`,
		);
		const jsonResposta = await resposta.json();
		const arrayDadosAlpaca = jsonResposta as typeDadoAlpaca[];
		const arrayDadosLightWeight = await funcaoAlpacaParaLightweight(arrayDadosAlpaca);
		const arrayVelasLightweigth = funcaoVelasLightWeight(arrayDadosLightWeight);
		estadoVelas = arrayVelasLightweigth;
	}
</script>

{#await funcaoLerDados()}
	<div>CARREGANDO...</div>
{:then}
	<div>
		{simbolo} ({periodo})
	</div>
	<LightweightVelas velas={estadoVelas as typeVelaLightWeight[]} />
{/await}
