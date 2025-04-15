import { funcaoAlpacaFetch } from '$lib/functions/funcaoAlpacaFetch';
import { funcaoAlpacaParaLightweight } from '$lib/functions/funcaoAlpacaParaLightweight';
import type { typeMoedaAlpaca } from '$lib/types/alpaca/typeMoedaAlpaca';
import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
import type { typeKline } from '$lib/types/lightweight/typeVela';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const simbolo = url.searchParams.get('moeda') ?? 'BTC/USD';
	const periodo = url.searchParams.get('periodo') ?? '1Day';
	const quantidade = url.searchParams.get('quantidade') ?? '30';
	const velas = await funcaoAlpacaFetch({
		tipo: 'criptomoeda',
		simbolo: simbolo as typeMoedaAlpaca,
		periodo: periodo as typePeriodoAlpaca,
		quantidade: parseInt(quantidade),
		fetch,
	});
	const dados = await funcaoAlpacaParaLightweight(velas);

	const candles: typeKline[] = dados.map((current) => {
		const { close, high, low, open, time } = current;
		return { close, high, low, open, time };
	});

	return json(candles);
};
