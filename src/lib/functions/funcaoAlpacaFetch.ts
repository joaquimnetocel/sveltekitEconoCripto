import { PRIVATE_ALPACA_KEY, PRIVATE_ALPACA_SECRET } from '$env/static/private';
import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';
import type { typeVelaAlpaca } from '$lib/types/alpaca/typeVelaAlpaca';

export async function funcaoAlpacaFetch({
	tipo,
	simbolo,
	periodo,
	quantidade,
	fetch,
}: {
	tipo: 'criptomoeda' | 'acao';
	simbolo: string;
	periodo: typePeriodoAlpaca;
	quantidade: number;
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}) {
	let url = '';
	if (tipo === 'criptomoeda') url = 'https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=';
	if (tipo === 'acao') url = 'https://data.alpaca.markets/v2/stocks/bars?symbols=';
	if (periodo === '1Day') {
		const now = new Date();
		const startDate = new Date(now);
		startDate.setDate(now.getDate() - quantidade);
		const startISO = startDate.toISOString();
		url = `${url}${encodeURIComponent(simbolo)}&timeframe=${periodo}&start=${encodeURIComponent(startISO)}&sort=asc`;
	} else if (periodo === '1Min') {
		const now = new Date();
		now.setMinutes(now.getMinutes() - quantidade);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		url = `${url}${encodeURIComponent(simbolo)}&timeframe=${periodo}&start=${timestamp}`;
	} else if (periodo === '5Min') {
		const now = new Date();
		now.setMinutes(now.getMinutes() - quantidade * 5);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		url = `${url}${encodeURIComponent(simbolo)}&timeframe=${periodo}&start=${timestamp}`;
	} else if (periodo === '15Min') {
		const now = new Date();
		now.setMinutes(now.getMinutes() - quantidade * 15);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		console.log(timestamp);
		url = `${url}${encodeURIComponent(simbolo)}&timeframe=${periodo}&start=${timestamp}`;
	} else if (periodo === '1Hour') {
		const now = new Date();
		now.setHours(now.getHours() - quantidade);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		url = `${url}${encodeURIComponent(simbolo)}&timeframe=${periodo}&start=${timestamp}`;
		console.log(url);
	}
	const headers = {
		'Apca-Api-Key-Id': PRIVATE_ALPACA_KEY,
		'Apca-Api-Secret-Key': PRIVATE_ALPACA_SECRET,
	};

	const result = await fetch(url, { headers });
	const json = await result.json();
	const velas = json.bars[simbolo] as typeVelaAlpaca[];
	return velas;
}
