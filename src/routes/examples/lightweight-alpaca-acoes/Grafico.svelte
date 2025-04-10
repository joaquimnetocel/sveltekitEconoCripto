<script lang="ts">
	import KlineLightweight from '$lib/components/KlineLightweight.svelte';
	import type { typeKline } from '$lib/types/typeKline';
	import type { typePeriodoAlpaca } from '$lib/types/typePeriodoAlpaca';

	let {
		agora,
		moeda,
		periodo = '1Day',
		quantidade,
	}: {
		agora: Date;
		moeda: string;
		periodo?: typePeriodoAlpaca;
		quantidade: number;
	} = $props();

	let estadoVelas = $state<typeKline[]>();

	$effect(() => {
		const intervalo = setInterval(funcaoLerDados, funcaoPeriodoParaSegundos(periodo) * 1000);
		return () => clearInterval(intervalo); // LIMPA AO DESMONTAR.
	});

	async function funcaoLerDados() {
		const resposta = await fetch(
			`/examples/lightweight-alpaca-acoes?moeda=${moeda}&periodo=${periodo}&quantidade=${quantidade}`,
		);
		estadoVelas = await resposta.json();
		console.log(estadoVelas);
	}

	function funcaoPeriodoParaSegundos(par: typePeriodoAlpaca) {
		if (par === '15Min') {
			const numberMinutosRestantes =
				15 - (agora.getMinutes() - Math.floor(agora.getMinutes() / 15) * 15);
			return numberMinutosRestantes * 60;
		} else if (par === '5Min') {
			const numberMinutosRestantes =
				5 - (agora.getMinutes() - Math.floor(agora.getMinutes() / 5) * 5);
			return numberMinutosRestantes * 60;
		} else if (par === '1Min') {
			return 60 - agora.getSeconds() + 3;
		} else if (par === '1Hour') {
			const numberMinutosRestantes = 60 - agora.getMinutes() + 1;
			return 60 * numberMinutosRestantes;
		}
		return 10000000000000;
	}
</script>

{#await funcaoLerDados()}
	<div>CARREGANDO...</div>
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
{:then _}
	<div>
		{moeda} ({periodo})
	</div>
	<KlineLightweight data={estadoVelas as typeKline[]} />
{/await}
