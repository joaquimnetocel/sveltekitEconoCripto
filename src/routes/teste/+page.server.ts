import { functionKline } from '$lib/functions/functionKlineMexc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dados = functionKline({
		symbol: 'BTCUSDT',
		interval: '5m',
		limit: 5,
	});
	return {
		dados,
	};
};
