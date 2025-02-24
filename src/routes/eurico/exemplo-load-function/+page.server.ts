import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const resposta = await fetch(
		'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/5.json',
	);
	const heroi = await resposta.json();
	return {
		heroi: heroi,
	};
};
