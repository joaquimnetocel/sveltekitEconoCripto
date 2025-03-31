import Mexc from 'mexc-api-sdk';

const apiKey = 'mx0vglNZysJrDIUm96';
const apiSecret = '08a5ec2b847a4bf78357ce04d8adab37';
const client = new Mexc.Spot(apiKey, apiSecret);

export function functionKlineMexc({
	symbol,
	interval,
	limit,
}: {
	symbol: string;
	interval: string;
	limit: number;
}) {
	const dadosBrutos = <[number, string, string, string, string, string, number, string][]>(
		client.klines(symbol, interval, { limit: limit })
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
