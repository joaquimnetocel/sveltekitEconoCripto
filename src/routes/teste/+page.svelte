<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const now = new Date();
</script>

{data.hora.toLocaleTimeString()}
<br />
{now}
