import type { typeVelaAlpaca } from '$lib/types/alpaca/typeVelaAlpaca';

export async function funcaoAlpacaParaLightweight(par: typeVelaAlpaca[]) {
	return par.map((current) => {
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
