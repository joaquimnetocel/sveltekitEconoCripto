import { funcaoRsi } from '$lib/functions/indicadores/funcaoRsi';
import type { typePontoApex } from '$lib/types/apex/typePontoApex';
import type { typeVelaApex } from '$lib/types/apex/typeVelaApex';

export function funcaoCriarRsiApex({
	velas,
	periodo,
}: {
	velas: typeVelaApex[];
	periodo: number;
}): typePontoApex[] {
	if (velas === undefined) return [];
	const fechamentos = velas.map((current) => current.y[3]);
	const rsi = funcaoRsi({
		periodo,
		valores: fechamentos,
	});

	const aa = velas.map((current, i) => {
		if (i < periodo) {
			return {
				x: current.x,
				y: null,
			};
		}
		return {
			x: current.x,
			y: rsi[i - periodo],
		};
	});
	return aa;
}
