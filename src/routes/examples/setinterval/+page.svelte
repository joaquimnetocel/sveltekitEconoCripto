<script lang="ts">
	function minhaFuncao() {
		console.log('Executando a função...');
	}

	$effect(() => {
		const intervalo = setInterval(minhaFuncao, 0.1 * 60 * 1000);
		return () => clearInterval(intervalo); // LIMPA AO DESMONTAR.
	});
</script>
