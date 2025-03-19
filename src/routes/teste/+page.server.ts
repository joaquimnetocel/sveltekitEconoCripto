import { functionKlineMexc } from '$lib/functions/functionKlineMexc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const dados = functionKlineMexc({
		symbol: 'BTCUSDT',
		interval: '5m',
		limit: 5,
	});
	return {
		dados,
	};
};
