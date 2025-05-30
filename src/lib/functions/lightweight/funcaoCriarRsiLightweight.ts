import { funcaoRsi } from '$lib/functions/indicadores/funcaoRsi';

import type { typeLinhaLightweight } from '$lib/types/lightweight/typeLinhaLightweight';
import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';

export function funcaoCriarRsiLightweight({
	velas,
	periodo,
}: {
	velas: typeVelaLightWeight[];
	periodo: number;
}): typeLinhaLightweight['dados'] {
	if (velas === undefined) return [];
	const fechamentos = velas.map((current) => current.close);
	const rsi = funcaoRsi({
		periodo,
		valores: fechamentos,
	});

	return velas.map((current, i) => {
		if (i < periodo) {
			return {
				time: current.time,
				value: undefined,
			};
		}
		return {
			time: current.time,
			value: rsi[i - periodo],
		};
	});
}
