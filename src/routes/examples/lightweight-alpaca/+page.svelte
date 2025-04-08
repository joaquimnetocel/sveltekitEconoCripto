<script lang="ts">
	import Hora from '$lib/components/Hora.svelte';
	import { constMoedasAlpaca } from '$lib/constantes/constMoedasAlpaca';
	import { constPeriodosAlpaca } from '$lib/constantes/constPeriodosAlpaca';
	import type { typeMoedaAlpaca } from '$lib/types/typeMoedaAlpaca';
	import type { typePeriodoAlpaca } from '$lib/types/typePeriodoAlpaca';
	import type { PageProps } from './$types';
	import Grafico from './Grafico.svelte';

	let { data }: PageProps = $props();

	let moeda = $state<typeMoedaAlpaca>('BTC/USD');
	let periodo = $state<typePeriodoAlpaca>('1Day');
	let agora = $state<Date>();
</script>

<Hora inicio={data.dateAlpaca} bind:agora />

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

{#if agora}
	<Grafico {moeda} {periodo} {agora} />
{/if}
