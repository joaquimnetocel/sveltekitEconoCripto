<script lang="ts">
	import { constMoedas } from '$lib/constantes/constMoedas';
	import { constPeriodos } from '$lib/constantes/constPeriodos';
	import type { typeMoeda } from '$lib/types/typeMoeda';
	import type { typePeriodo } from '$lib/types/typePeriodo';
	import Grafico from './Grafico.svelte';

	let moeda = $state<typeMoeda>('BTCUSDT');
	let periodo = $state<typePeriodo>('1d');
</script>

<select bind:value={moeda}>
	{#each constMoedas as current}
		<option value={current}>{current}</option>
	{/each}
</select>

<select bind:value={periodo}>
	{#each constPeriodos as current}
		<option value={current}>{current}</option>
	{/each}
</select>

<Grafico {moeda} {periodo} />
