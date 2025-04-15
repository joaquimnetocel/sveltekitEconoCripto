<script lang="ts">
	import type { typeVela } from '$lib/types/apex/typeVela';
	import type ApexCharts from 'apexcharts';
	import { untrack } from 'svelte';

	let {
		velas,
	}: {
		velas: typeVela[];
	} = $props();

	let elemento = $state<HTMLDivElement>();
	let grafico = $state<ApexCharts>();

	const opcoes: ApexCharts.ApexOptions = {
		series: [
			{
				data: [],
			},
		],
		chart: {
			type: 'candlestick',
			height: 350,
		},
		title: {
			text: 'CandleStick Chart',
			align: 'left',
		},
		xaxis: {
			type: 'datetime',
		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
		},
	};

	async function funcaoAsyncEffect() {
		const apex = await import('apexcharts');
		grafico = new apex.default(elemento, opcoes);
		grafico.render();
	}

	$effect(() => {
		untrack(() => {
			funcaoAsyncEffect();
		});
	});

	$effect(() => {
		if (grafico) {
			const arraySeries: ApexCharts.ApexOptions['series'] = [];
			arraySeries[0] = {
				data: velas,
				type: 'candlestick',
				name: 'COTAÇÕES',
			};

			grafico.updateSeries(arraySeries);
		}
	});
</script>

<div bind:this={elemento} style="width:100%;"></div>
