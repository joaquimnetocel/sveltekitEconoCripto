<script lang="ts">
	import Hora from '$lib/componentes/Hora.svelte';
	import OpcoesDoGrafico from '$lib/componentes/OpcoesDoGrafico.svelte';
	import { constMoedasAlpaca } from '$lib/constantes/alpaca/constMoedasAlpaca';
	import { constPeriodosAlpaca } from '$lib/constantes/alpaca/constPeriodosAlpaca';
	import type { typeMoedaAlpaca } from '$lib/types/alpaca/typeMoedaAlpaca';
	import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
	import type { PageProps } from './$types';
	import Grafico from './Grafico.svelte';

	let { data }: PageProps = $props();

	let simbolo = $state<typeMoedaAlpaca>('BTC/USD');
	let periodo = $state<typePeriodoAlpaca>('1Day');
	let agora = $state<Date>();
	let quantidade = $state(30);
</script>

<div>
	RELÓGIO: <Hora inicio={data.dateAlpaca} bind:agora />
</div>
<OpcoesDoGrafico
	bind:periodo
	bind:simbolo
	bind:quantidade
	simbolos={constMoedasAlpaca}
	periodos={constPeriodosAlpaca}
/>
<div>
	{#if agora}
		<Grafico {simbolo} {periodo} {agora} {quantidade} />
	{/if}
</div>
