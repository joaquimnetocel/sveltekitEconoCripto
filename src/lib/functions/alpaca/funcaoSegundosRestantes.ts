// import type { typePeriodoAlpaca } from '$lib/types/alpaca/typePeriodoAlpaca';

export function funcaoSegundosRestantes({ periodo, agora }: { periodo: string; agora: Date }) {
	if (periodo === '15Min') {
		const numberMinutosRestantes =
			15 - (agora.getMinutes() - Math.floor(agora.getMinutes() / 15) * 15);
		return numberMinutosRestantes * 60;
	} else if (periodo === '5Min') {
		const numberMinutosRestantes =
			5 - (agora.getMinutes() - Math.floor(agora.getMinutes() / 5) * 5);
		return numberMinutosRestantes * 60;
	} else if (periodo === '1Min') {
		return 60 - agora.getSeconds() + 3;
	} else if (periodo === '1Hour') {
		const numberMinutosRestantes = 60 - agora.getMinutes() + 1;
		return 60 * numberMinutosRestantes;
	}
	return 10000000000000;
}
