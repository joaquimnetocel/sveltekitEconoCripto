import { PRIVATE_MEXC_KEY, PRIVATE_MEXC_SECRET } from '$env/static/private';
import crypto from 'crypto';

export async function functionKlineMexc({
	symbol,
	interval,
	limit,
	fetch,
}: {
	symbol: string;
	interval: string;
	limit: number;
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}) {
	const query = `symbol=${symbol}&interval=${interval}&limit=${limit}`;
	const signature = crypto.createHmac('sha256', PRIVATE_MEXC_SECRET).update(query).digest('hex');
	const result = await fetch(
		`https://api.mexc.com/api/v3/klines?${query}&signature=${signature}&apiKey=${PRIVATE_MEXC_KEY}`,
	);
	const dadosBrutos = <[number, string, string, string, string, string, number, string][]>(
		await result.json()
	);
	return dadosBrutos.map((current) => {
		return {
			time: Math.floor(current[0] / 1000),
			open: parseFloat(current[1]),
			high: parseFloat(current[2]),
			low: parseFloat(current[3]),
			close: parseFloat(current[4]),
			volume: parseFloat(current[5]),
			close_time: current[6],
			quote_asset_volume: parseFloat(current[7]),
		};
	});
}
