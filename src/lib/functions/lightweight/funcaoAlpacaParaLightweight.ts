import type { typeDadoAlpaca } from '$lib/types/alpaca/typeDadoAlpaca';
import type { typeDadoLightWeight } from '$lib/types/lightweight/typeDadoLightWeight';

export async function funcaoAlpacaParaLightweight(par: typeDadoAlpaca[]) {
	return par.map((current) => {
		const retorno: typeDadoLightWeight = {
			time: Math.floor(new Date(current.t).getTime() / 1000),
			open: current.o,
			high: current.h,
			low: current.l,
			close: current.c,
			volume: current.v,
		};
		return retorno;
	});
}
