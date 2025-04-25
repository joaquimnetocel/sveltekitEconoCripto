<script lang="ts">
	import Hora from '$lib/components/Hora.svelte';
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
	let estadoInputQuantidade = $state(30);
	let estadoEnterPressionado = $state(false);
	let quantidade = $state(30);

	function funcaoQuantidadeAlterada() {
		quantidade = estadoInputQuantidade;
	}

	function funcaoTecla(event: { key: string; preventDefault: () => void }) {
		estadoEnterPressionado = false;
		if (event.key === 'Enter') {
			event.preventDefault();
			estadoEnterPressionado = true;
			funcaoQuantidadeAlterada();
		}
	}

	function funcaoPerdeFoco() {
		// Se acabou de apertar Enter, ignora esse blur
		if (estadoEnterPressionado) {
			// Espera um micro tempo pra evitar repetição
			setTimeout(() => {
				estadoEnterPressionado = false;
			}, 100);
			return;
		}
		funcaoQuantidadeAlterada();
	}
</script>

<div>
	RELÓGIO: <Hora inicio={data.dateAlpaca} bind:agora />
</div>
<div>
	SÍMBOLO: <select bind:value={simbolo}>
		{#each constAcoesAlpaca as current}
			<option value={current}>{current}</option>
		{/each}
	</select>

	PERÍODO:
	<select bind:value={periodo}>
		{#each constPeriodosAlpaca as current}
			<option value={current}>{current}</option>
		{/each}
	</select>
	QUANTIDADE:
	<input
		type="number"
		bind:value={estadoInputQuantidade}
		onkeydown={funcaoTecla}
		onblur={funcaoPerdeFoco}
	/>
</div>
<br />
<div>
	{#if agora}
		<Grafico {simbolo} {periodo} {agora} {quantidade} />
	{/if}
</div>
