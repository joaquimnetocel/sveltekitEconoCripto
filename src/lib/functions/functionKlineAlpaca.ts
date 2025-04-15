import { PRIVATE_ALPACA_KEY, PRIVATE_ALPACA_SECRET } from '$env/static/private';
import type { typePeriodoAlpaca } from '$lib/types/typePeriodoAlpaca';

export async function functionKlineAlpaca({
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
	const aa = await result.json();
	const bb = aa.bars[simbolo];
	type cc = {
		c: number;
		h: number;
		l: number;
		n: number;
		o: number;
		t: string;
		v: number;
		vw: number;
	};
	const dadosBrutos = <cc[]>bb;

	return dadosBrutos.map((current) => {
		return {
			time: Math.floor(new Date(current.t).getTime() / 1000),
			open: current.o,
			high: current.h,
			low: current.l,
			close: current.c,
			volume: current.v,
		};
	});
}
