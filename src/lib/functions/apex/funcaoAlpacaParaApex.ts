import type { typeDadoAlpaca } from '$lib/types/alpaca/typeDadoAlpaca';
import type { typeVelaApex } from '$lib/types/apex/typeVelaApex';

export async function funcaoAlpacaParaApex(par: typeDadoAlpaca[]) {
	return par.map((current) => {
		const retorno: typeVelaApex = {
			x: new Date(current.t),
			y: [current.o, current.h, current.l, current.c],
		};
		return retorno;
	});
}
