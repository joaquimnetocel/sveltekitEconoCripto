import { funcaoHorarioAlpaca } from '$lib/functions/alpaca/funcaoHorarioAlpaca';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		dateAlpaca: await funcaoHorarioAlpaca({ fetch }),
	};
};
