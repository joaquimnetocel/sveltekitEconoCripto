import type { typeDadoLightWeight } from '$lib/types/lightweight/typeDadoLightWeight';
import type { typeVelaLightWeight } from '$lib/types/lightweight/typeVelaLightWeight';

export function funcaoVelasLightWeight(par: typeDadoLightWeight[]) {
	const arrayVelasLightweigth: typeVelaLightWeight[] = par.map((current) => {
		const { close, high, low, open, time } = current;
		return { close, high, low, open, time };
	});
	return arrayVelasLightweigth;
}
