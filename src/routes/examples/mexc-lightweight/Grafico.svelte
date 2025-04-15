<script lang="ts">
	import KlineLightweight from '$lib/components/KlineLightweight.svelte';
	import type { typeKline } from '$lib/types/lightweight/typeKline';
	import type { typePeriodoMexc } from '$lib/types/typePeriodoMexc';

	let {
		moeda,
		periodo = '1d',
		segundos = 5,
	}: {
		moeda: string;
		periodo?: typePeriodoMexc;
		segundos?: number;
	} = $props();

	let estadoCandles = $state<typeKline[]>();

	async function functionLoadData() {
		const response = await fetch(`/examples/mexc-lightweight?moeda=${moeda}&periodo=${periodo}`);
		estadoCandles = await response.json();
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
