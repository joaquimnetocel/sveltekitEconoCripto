export async function functionKlineAlpaca({
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
	let url = '';
	if (interval.includes('D')) {
		const now = new Date();
		const startDate = new Date(now);
		startDate.setDate(now.getDate() - limit);
		const startISO = startDate.toISOString();
		url = `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(symbol)}&timeframe=${interval}&start=${encodeURIComponent(startISO)}&sort=asc`;
	} else {
		url = `https://data.alpaca.markets/v1beta3/crypto/us/bars?symbols=${encodeURIComponent(symbol)}&timeframe=${interval}&limit=${limit}&sort=asc`;
	}

	const result = await fetch(url);
	const aa = await result.json();
	const bb = aa.bars[symbol];
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
