<script lang="ts">
	import { constMoedasMexc } from '$lib/constantes/constMoedasMexc';
	import { constPeriodosMexc } from '$lib/constantes/constPeriodosMexc';
	import type { typeMoedaMexc } from '$lib/types/mexc/typeMoedaMexc';
	import type { typePeriodoMexc } from '$lib/types/typePeriodoMexc';
	import Grafico from './Grafico.svelte';

	let moeda = $state<typeMoedaMexc>('BTCUSDT');
	let periodo = $state<typePeriodoMexc>('1d');
</script>

<select bind:value={moeda}>
	{#each constMoedasMexc as current}
		<option value={current}>{current}</option>
	{/each}
</select>

<select bind:value={periodo}>
	{#each constPeriodosMexc as current}
		<option value={current}>{current}</option>
	{/each}
</select>

<Grafico {moeda} {periodo} />
