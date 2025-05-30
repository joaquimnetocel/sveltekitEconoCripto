<script lang="ts">
	import type { typeLinhaLightweight } from '$lib/types/lightweight/typeLinhaLightweight';
	import type { ISeriesApi } from 'lightweight-charts';
	import {
		createChart,
		LineSeries,
		type ChartOptions,
		type DeepPartial,
		type IChartApi,
		type LineData,
		type Time,
	} from 'lightweight-charts';
	import { untrack } from 'svelte';

	let {
		linhas = [],
	}: {
		linhas: typeLinhaLightweight[];
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

	let chart: IChartApi;
	let lineSeries: ISeriesApi<'Line'>[] = [];

	$effect(() => {
		untrack(() => {
			if (div) {
				chart = createChart(div, chartOptions);

				lineSeries = linhas.map((linha) => {
					const serie = chart.addSeries(LineSeries, linha.opcoes);
					return serie;
				});

				chart.timeScale().fitContent();
			}
			return () => {
				if (chart) chart.remove();
			};
		});
	});

	$effect(() => {
		lineSeries.forEach((serie, i) => {
			serie.setData(linhas[i].dados as LineData<Time>[]);
		});
	});
</script>

<div bind:this={div} style="width: 100%; height: 150px;"></div>
