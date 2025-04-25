import { functionMexcFetch } from '$lib/functions/mexc/funcaoMexcFetch';
import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const moeda = url.searchParams.get('moeda') ?? 'BTCUSDT';
	const periodo = url.searchParams.get('periodo') ?? '1d';
	const dados = await functionMexcFetch({
		symbol: moeda,
		interval: periodo,
		limit: 100,
		fetch,
	});
	const candles: typeVelaLightWeight[] = dados.map((current) => {
		const { close, high, low, open, time } = current;
		return { close, high, low, open, time };
	});

	return json(candles);
};
