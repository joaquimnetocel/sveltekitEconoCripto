import { funcaoHorarioAlpaca } from '$lib/functions/alpaca/funcaoHorarioAlpaca';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const hora = await funcaoHorarioAlpaca({ fetch });
	return { hora };
};
