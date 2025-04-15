<script lang="ts">
	import KlineLightweight from '$lib/components/KlineLightweight.svelte';
	import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
	import type { typeKline } from '$lib/types/lightweight/typeKline';

	let {
		agora,
		simbolo,
		periodo = '1Day',
		quantidade,
	}: {
		agora: Date;
		simbolo: string;
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
			`/examples/alpaca-lightweight-acoes?simbolo=${simbolo}&periodo=${periodo}&quantidade=${quantidade}`,
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
		{simbolo} ({periodo})
	</div>
	<KlineLightweight data={estadoVelas as typeKline[]} />
{/await}
