import { functionKlineMexc } from '$lib/functions/functionKlineMexc';
import type { typeKline } from '$lib/types/typeKline';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async () => {
	const dados = functionKlineMexc({
		symbol: 'BTCUSDT',
		interval: '5m',
		limit: 100,
	});
	const candles: typeKline[] = dados.map((current) => {
		const { close, high, low, open, time } = current;
		return { close, high, low, open, time };
	});

	return {
		candles,
	};
};
