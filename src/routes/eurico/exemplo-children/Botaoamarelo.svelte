<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		texto,
	}: {
		texto: string;
		children: Snippet;
	} = $props();
</script>

<div>
	<button
		style="background:yellow;"
		onclick={() => {
			alert('oi');
		}}
	>
		{texto}
		{@render children()}
	</button>
</div>
