import { funcaoAlpacaFetch } from '$lib/functions/alpaca/funcaoAlpacaFetch';
import type { typeMoedaAlpaca } from '$lib/types/alpaca/typeMoedaAlpaca';
import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const simbolo = url.searchParams.get('simbolo') ?? 'BTC/USD';
	const periodo = url.searchParams.get('periodo') ?? '1Day';
	const quantidade = url.searchParams.get('quantidade') ?? '30';
	const dados = await funcaoAlpacaFetch({
		tipo: 'acao',
		simbolo: simbolo as typeMoedaAlpaca,
		periodo: periodo as typePeriodoAlpaca,
		quantidade: parseInt(quantidade),
		fetch,
	});
	return json(dados);
};
