<script lang="ts">
	import ApexVelas from '$lib/componentes/ApexVelas.svelte';
	import { funcaoAlpacaParaApex } from '$lib/functions/apex/funcaoAlpacaParaApex';
	import type { typeDadoAlpaca } from '$lib/types/alpaca/typeDadoAlpaca';
	import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
	import type { typeVelaApex } from '$lib/types/apex/typeVelaApex';
	import { funcaoFetch } from './funcaoFetch';

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

	let estadoVelas = $state<typeVelaApex[]>();

	async function funcaoPreencherVelas() {
		const dados_sem_tipagem = await funcaoFetch({
			periodo,
			quantidade,
			simbolo,
		});
		const arrayDadosAlpaca = dados_sem_tipagem as typeDadoAlpaca[];
		const arrayVelasApex = await funcaoAlpacaParaApex(arrayDadosAlpaca);
		estadoVelas = arrayVelasApex;
	}

	let minuto = $derived(agora.getMinutes());
	let hora = $derived(agora.getHours());

	$effect(() => {
		if (periodo === '1Min') {
			void minuto;
			funcaoPreencherVelas();
			console.log(`ATINGIU PERIODO DE 1 MINUTO`);
		} else if (periodo === '5Min') {
			if (minuto % 5 !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 5 MINUTOS');
		} else if (periodo === '15Min') {
			if (minuto % 15 !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 15 MINUTOS');
		} else if (periodo === '1Hour') {
			if (minuto !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 1 HORA');
		} else if (periodo === '1Day') {
			if (hora !== 21 || minuto !== 1) return;
			funcaoPreencherVelas();
			console.log('ATINGIU PERIODO DE 1 HORA');
		}
	});
</script>

<div>
	{simbolo} ({periodo})
</div>

{#await funcaoPreencherVelas()}
	<div>CARREGANDO...</div>
{:then}
	<ApexVelas velas={estadoVelas as typeVelaApex[]} />
{/await}
