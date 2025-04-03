<script lang="ts">
	import { constMoedasAlpaca } from '$lib/constantes/constMoedasAlpaca';
	import { constPeriodosAlpaca } from '$lib/constantes/constPeriodosAlpaca';
	import type { typeMoedaAlpaca } from '$lib/types/typeMoedaAlpaca';
	import type { typePeriodoAlpaca } from '$lib/types/typePeriodoAlpaca';
	import Grafico from './Grafico.svelte';

	let moeda = $state<typeMoedaAlpaca>('BTC/USD');
	let periodo = $state<typePeriodoAlpaca>('1D');
</script>

<select bind:value={moeda}>
	{#each constMoedasAlpaca as current}
		<option value={current}>{current}</option>
	{/each}
</select>

<select bind:value={periodo}>
	{#each constPeriodosAlpaca as current}
		<option value={current}>{current}</option>
	{/each}
</select>

<Grafico {moeda} {periodo} />
