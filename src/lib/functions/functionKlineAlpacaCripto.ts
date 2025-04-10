import type { typePeriodoAlpaca } from '$lib/types/typePeriodoAlpaca';

export async function functionKlineAlpaca({
	moeda,
	periodo,
	quantidade,
	fetch,
}: {
	moeda: string;
	periodo: typePeriodoAlpaca;
	quantidade: number;
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}) {
	let url = '';
	// const headers = {
	//     "Apca-Api-Key-Id": "SUA_API_KEY",
	//     "Apca-Api-Secret-Key": "SEU_SECRET_KEY"
	// };
	// const response = await fetch(url, { headers });
	if (periodo === '1Day') {
		const now = new Date();
		const startDate = new Date(now);
		startDate.setDate(now.getDate() - quantidade);
		const startISO = startDate.toISOString();
		url = `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(moeda)}&timeframe=${periodo}&start=${encodeURIComponent(startISO)}&sort=asc`;
	} else if (periodo === '1Min') {
		const now = new Date();
		now.setMinutes(now.getMinutes() - quantidade);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		url = `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(moeda)}&timeframe=${periodo}&start=${timestamp}`;
	} else if (periodo === '5Min') {
		const now = new Date();
		now.setMinutes(now.getMinutes() - quantidade * 5);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		url = `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(moeda)}&timeframe=${periodo}&start=${timestamp}`;
	} else if (periodo === '15Min') {
		const now = new Date();
		now.setMinutes(now.getMinutes() - quantidade * 15);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		console.log(timestamp);
		url = `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(moeda)}&timeframe=${periodo}&start=${timestamp}`;
	} else if (periodo === '1Hour') {
		const now = new Date();
		now.setHours(now.getHours() - quantidade);
		const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formato correto
		url = `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(moeda)}&timeframe=${periodo}&start=${timestamp}`;
		console.log(url);
	}

	const result = await fetch(url);
	const aa = await result.json();
	const bb = aa.bars[moeda];
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
