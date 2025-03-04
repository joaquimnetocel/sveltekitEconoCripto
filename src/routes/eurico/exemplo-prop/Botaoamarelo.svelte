<script lang="ts">
	let contador = $state(0);

	let {
		textomais = '+',
		textomenos = '-',
	}: {
		textomais?: string;
		textomenos?: string;
	} = $props();
</script>

<div>
	<button
		style="background:yellow;"
		onclick={() => {
			contador = contador - 1;
		}}
	>
		{textomenos}
	</button>
	{contador}
	<button
		style="background:yellow;"
		onclick={() => {
			contador = contador + 1;
		}}
	>
		{textomais}
	</button>
</div>
