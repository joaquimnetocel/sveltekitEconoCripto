<script lang="ts">
	let contador = $state(0);
</script>

<div>
	<button
		onclick={() => {
			contador = contador - 1;
		}}
	>
		DIMINUIR
	</button>
</div>
<div>
	{contador}
</div>
<div>
	<button
		onclick={() => {
			contador = contador + 1;
		}}
	>
		AUMENTAR
	</button>
</div>
