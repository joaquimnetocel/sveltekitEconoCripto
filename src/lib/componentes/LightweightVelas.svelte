<script lang="ts">
	import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';
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
		velas,
	}: {
		velas: typeVelaLightWeight[];
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
			candlestickSeries.setData(untrack(() => velas) as CandlestickData<Time>[]);
			chart.timeScale().fitContent();
		}
	});

	$effect(() => {
		candlestickSeries.setData(velas as CandlestickData<Time>[]);
	});
</script>

<div bind:this={div} id="divGrafico" style="width: 100%; height: 300px;"></div>
