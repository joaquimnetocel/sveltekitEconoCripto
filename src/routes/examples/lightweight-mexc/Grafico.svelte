<script lang="ts">
	import KlineLightweight from '$lib/components/KlineLightweight.svelte';
	import type { typeKline } from '$lib/types/typeKline';

	let {
		moeda,
		periodo = '1d',
		segundos = 5,
	}: {
		moeda: string;
		periodo?: '1d' | '5m' | '1m';
		segundos?: number;
	} = $props();

	let estadoCandles = $state<typeKline[]>();

	async function functionLoadData() {
		const response = await fetch(`/examples/lightweight-mexc?moeda=${moeda}&periodo=${periodo}`);
		estadoCandles = await response.json();
	}

	$effect(() => {
		const intervalo = setInterval(functionLoadData, segundos * 1000);
		return () => clearInterval(intervalo); // LIMPA AO DESMONTAR.
	});
</script>

{#await functionLoadData()}
	CARREGANDO...
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
{:then _}
	<div>
		{moeda} ({periodo})
	</div>
	<KlineLightweight data={estadoCandles as typeKline[]} />
{/await}
