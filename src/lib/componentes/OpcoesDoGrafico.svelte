<script lang="ts">
	let {
		simbolos,
		periodos,
		simbolo = $bindable(),
		periodo = $bindable(),
		quantidade = $bindable(30),
	}: {
		simbolos: string[];
		periodos: string[];
		simbolo: string;
		periodo: string;
		quantidade: number;
	} = $props();

	let quantidade_digitada = $state(30);
	let enter_pressionado = $state(false);

	function funcaoQuantidadeAlterada() {
		quantidade = quantidade_digitada;
	}

	function funcaoTecla(event: { key: string; preventDefault: () => void }) {
		enter_pressionado = false;
		if (event.key === 'Enter') {
			event.preventDefault();
			enter_pressionado = true;
			funcaoQuantidadeAlterada();
		}
	}

	function funcaoPerdeFoco() {
		// Se acabou de apertar Enter, ignora esse blur
		if (enter_pressionado) {
			// Espera um micro tempo pra evitar repetição
			setTimeout(() => {
				enter_pressionado = false;
			}, 100);
			return;
		}
		funcaoQuantidadeAlterada();
	}
</script>

<div>
	SÍMBOLO: <select bind:value={simbolo}>
		{#each simbolos as current}
			<option value={current}>{current}</option>
		{/each}
	</select>

	PERÍODO:
	<select bind:value={periodo}>
		{#each periodos as current}
			<option value={current}>{current}</option>
		{/each}
	</select>
	QUANTIDADE:
	<input
		type="number"
		bind:value={quantidade_digitada}
		onkeydown={funcaoTecla}
		onblur={funcaoPerdeFoco}
	/>
</div>
<br />
