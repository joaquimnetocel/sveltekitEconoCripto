import { functionKlineAlpaca } from '$lib/functions/functionKlineAlpaca';
import type { typeKline } from '$lib/types/typeKline';
import type { typeMoedaAlpaca } from '$lib/types/typeMoedaAlpaca';
import type { typePeriodoAlpaca } from '$lib/types/typePeriodoAlpaca';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const moeda = url.searchParams.get('moeda') ?? 'BTC/USD';
	const periodo = url.searchParams.get('periodo') ?? '1Day';
	const dados = await functionKlineAlpaca({
		symbol: moeda as typeMoedaAlpaca,
		interval: periodo as typePeriodoAlpaca,
		limit: 5,
		fetch,
	});
	const candles: typeKline[] = dados.map((current) => {
		const { close, high, low, open, time } = current;
		return { close, high, low, open, time };
	});

	return json(candles);
};
