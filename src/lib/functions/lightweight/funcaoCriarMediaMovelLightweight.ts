import { funcaoMediaMovel } from '$lib/functions/indicadores/funcaoMediaMovel';
import type { typeLinhaLightweight } from '$lib/types/lightweight/typeLinhaLightweight';
import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';

export function funcaoCriarMediaMovelLightweight(
	velas: typeVelaLightWeight[],
	periodo: number,
): typeLinhaLightweight['dados'] {
	if (velas === undefined) return [];
	const fechamentos = velas.map((current) => current.close);
	const mediasmoveis = funcaoMediaMovel({
		periodo,
		valores: fechamentos,
	});

	const velasnaoqueimadas = velas.slice(periodo - 1);
	return velasnaoqueimadas.map((current, i) => {
		return {
			time: current.time,
			value: mediasmoveis[i],
		};
	});
}
