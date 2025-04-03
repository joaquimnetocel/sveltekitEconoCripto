import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const symbol = 'BTC/USD';
	const result = await fetch(
		`https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(symbol)}&timeframe=1Min&limit=1000&sort=asc`,
	);
	const aux = await result.json();
	const dados = aux.bars[symbol][0];
	return { dados };
};
