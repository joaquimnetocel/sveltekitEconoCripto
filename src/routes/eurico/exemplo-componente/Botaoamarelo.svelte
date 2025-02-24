<script lang="ts">
	let contador = $state(0);
</script>

<div>
	<button
		style="background:yellow;"
		onclick={() => {
			contador = contador - 1;
		}}
	>
		DIMINUIR
	</button>
	{contador}
	<button
		style="background:yellow;"
		onclick={() => {
			contador = contador + 1;
		}}
	>
		AUMENTAR
	</button>
</div>
