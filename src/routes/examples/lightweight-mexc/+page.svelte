<script lang="ts">
	import KlineLightweight from '$lib/components/KlineLightweight.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<KlineLightweight data={data.candles} />
