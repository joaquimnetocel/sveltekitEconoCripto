<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<img src={data.heroi.images.lg} alt="BOLA" />
