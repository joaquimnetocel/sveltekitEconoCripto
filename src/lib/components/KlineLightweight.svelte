<script lang="ts">
	import type { typeVela } from '$lib/types/lightweight/typeVela';
	import {
		CandlestickSeries,
		createChart,
		type CandlestickData,
		type ChartOptions,
		type DeepPartial,
		type Time,
	} from 'lightweight-charts';
	import { untrack } from 'svelte';

	let {
		data,
	}: {
		data: typeVela[];
	} = $props();

	let div = $state<HTMLDivElement>();

	const chartOptions: DeepPartial<ChartOptions> = {
		layout: {
			textColor: 'black',
			background: {
				color: 'white',
			},
		},
	};

	let candlestickSeries: ReturnType<typeof createChart>['addSeries'] extends (
		type: infer T,
		options?: infer O,
	) => infer R
		? R
		: never;

	$effect(() => {
		if (div) {
			const chart = createChart(div, chartOptions);
			candlestickSeries = chart.addSeries(CandlestickSeries, {
				upColor: '#26a69a',
				downColor: '#ef5350',
				borderVisible: false,
				wickUpColor: '#26a69a',
				wickDownColor: '#ef5350',
			});
			candlestickSeries.setData(untrack(() => data) as CandlestickData<Time>[]);
			chart.timeScale().fitContent();
		}
	});

	$effect(() => {
		candlestickSeries.setData(data as CandlestickData<Time>[]);
	});
</script>

<div bind:this={div} id="divGrafico" style="width: 100%; height: 300px;"></div>
