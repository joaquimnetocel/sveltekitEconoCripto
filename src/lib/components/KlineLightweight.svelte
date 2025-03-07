<script lang="ts">
	import type { typeKline } from '$lib/types/typeKline';
	import {
		CandlestickSeries,
		createChart,
		type CandlestickData,
		type ChartOptions,
		type DeepPartial,
		type Time,
	} from 'lightweight-charts';

	let {
		data,
	}: {
		data: typeKline[];
	} = $props();

	const chartOptions: DeepPartial<ChartOptions> = {
		layout: {
			textColor: 'black',
			background: {
				color: 'white',
			},
		},
	};

	$effect(() => {
		const aux = document.getElementById('container');
		if (aux) {
			const chart = createChart(aux, chartOptions);
			const candlestickSeries = chart.addSeries(CandlestickSeries, {
				upColor: '#26a69a',
				downColor: '#ef5350',
				borderVisible: false,
				wickUpColor: '#26a69a',
				wickDownColor: '#ef5350',
			});
			candlestickSeries.setData(data as CandlestickData<Time>[]);
			chart.timeScale().fitContent();
		}
	});
</script>

<div id="container" style="width: 100%; height: 300px;"></div>
