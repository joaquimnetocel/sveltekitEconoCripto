<script lang="ts">
	import {
		CandlestickSeries,
		createChart,
		type CandlestickData,
		type ChartOptions,
		type DeepPartial,
		type Time,
	} from 'lightweight-charts';
	import { functionFormatDate } from './functionFormatDate';

	const chartOptions: DeepPartial<ChartOptions> = {
		layout: {
			textColor: 'black',
			background: {
				color: 'white',
			},
		},
	};
	const data: CandlestickData<Time>[] = [
		{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: functionFormatDate(1642427876) },
		{ open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: functionFormatDate(1642514276) },
		{ open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: functionFormatDate(1642600676) },
		{ open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: functionFormatDate(1642687076) },
		{ open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: functionFormatDate(1642773476) },
		{ open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: functionFormatDate(1642859876) },
		{ open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: functionFormatDate(1642946276) },
		{ open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: functionFormatDate(1643032676) },
		{ open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: functionFormatDate(1643119076) },
		{ open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: functionFormatDate(1643205476) },
	];

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
			candlestickSeries.setData(data);
			chart.timeScale().fitContent();
		}
	});
</script>

<div id="container" style="width: 100%; height: 300px;"></div>
