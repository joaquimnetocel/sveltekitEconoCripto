<script lang="ts">
	import ApexCandleChart from '$lib/componentes/ApexVelas.svelte';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();
</script>

<div>
	<div>
		<a href="/">VOLTAR</a>
	</div>

	<ApexCandleChart velas={data.velas} />
</div>
