<script lang="ts">
	import KlineLightweight from '$lib/components/KlineLightweight.svelte';
	import type { typeKline } from '$lib/types/typeKline';
	import type { typePeriodoAlpaca } from '$lib/types/typePeriodoAlpaca';

	let {
		moeda,
		periodo = '1D',
		segundos = 5,
	}: {
		moeda: string;
		periodo?: typePeriodoAlpaca;
		segundos?: number;
	} = $props();

	let estadoCandles = $state<typeKline[]>();

	async function functionLoadData() {
		const response = await fetch(`/examples/lightweight-alpaca?moeda=${moeda}&periodo=${periodo}`);
		estadoCandles = await response.json();
		console.log(estadoCandles);
	}

	$effect(() => {
		const intervalo = setInterval(functionLoadData, segundos * 1000);
		return () => clearInterval(intervalo); // LIMPA AO DESMONTAR.
	});
</script>

{#await functionLoadData()}
	<div>CARREGANDO...</div>
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
{:then _}
	<div>
		{moeda} ({periodo})
	</div>
	<KlineLightweight data={estadoCandles as typeKline[]} />
{/await}
