import { functionKlineAlpaca } from '$lib/functions/functionKlineAlpaca';
import type { typeKline } from '$lib/types/typeKline';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const moeda = url.searchParams.get('moeda') ?? 'BTC/USD';
	const periodo = url.searchParams.get('periodo') ?? '1D';
	const dados = await functionKlineAlpaca({
		symbol: moeda,
		interval: periodo,
		limit: 30,
		fetch,
	});
	const candles: typeKline[] = dados.map((current) => {
		const { close, high, low, open, time } = current;
		return { close, high, low, open, time };
	});

	return json(candles);
};
