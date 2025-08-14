import { funcaoMediaMovel } from '$lib/functions/indicadores/funcaoMediaMovel';
import type { typePontoApex } from '$lib/types/apex/typePontoApex';
import type { typeVelaApex } from '$lib/types/apex/typeVelaApex';

export function funcaoCriarMediaMovelApex({
	velas,
	periodo,
}: {
	velas: typeVelaApex[];
	periodo: number;
}): typePontoApex[] {
	if (velas === undefined) return [];
	const fechamentos = velas.map((current) => current.y[3]);
	const mediasmoveis = funcaoMediaMovel({
		periodo,
		valores: fechamentos,
	});

	const velasnaoqueimadas = velas.slice(periodo - 1);
	return velasnaoqueimadas.map((current, i) => {
		return {
			x: current.x,
			y: mediasmoveis[i],
		};
	});
}
