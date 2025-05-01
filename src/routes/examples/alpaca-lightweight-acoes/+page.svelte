<script lang="ts">
	import Hora from '$lib/componentes/Hora.svelte';
	import OpcoesDoGrafico from '$lib/componentes/OpcoesDoGrafico.svelte';
	import { constAcoesAlpaca } from '$lib/constantes/alpaca/constAcoesAlpaca';
	import { constPeriodosAlpaca } from '$lib/constantes/alpaca/constPeriodosAlpaca';
	import type { typeAcaoAlpaca } from '$lib/types/alpaca/typeAcaoAlpaca';
	import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
	import type { PageProps } from './$types';
	import Grafico from './Grafico.svelte';

	let { data }: PageProps = $props();

	let simbolo = $state<typeAcaoAlpaca>('TSLA');
	let periodo = $state<typePeriodoAlpaca>('1Day');
	let agora = $state<Date>();
	let quantidade = $state(30);
</script>

<div>
	RELÓGIO: <Hora inicio={data.dateAlpaca} bind:agora />
</div>
<OpcoesDoGrafico
	bind:periodo
	bind:quantidade
	bind:simbolo
	simbolos={constAcoesAlpaca}
	periodos={constPeriodosAlpaca}
/>
<div>
	{#if agora}
		<Grafico {simbolo} {periodo} {agora} {quantidade} />
	{/if}
</div>
