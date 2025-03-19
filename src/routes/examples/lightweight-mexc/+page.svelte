<script lang="ts">
	import Grafico from './Grafico.svelte';

	const symbols = ['BTCUSDT', 'SOLUSDT', 'ETHUSDT'];
</script>

{#each symbols as current}
	<Grafico moeda={current} periodo="1m" />
{/each}
