export async function funcaoFetch({
	simbolo,
	periodo,
	quantidade,
}: {
	simbolo: string;
	periodo: string;
	quantidade: number;
}) {
	const resposta = await fetch(
		`/examples/alpaca-apex-cripto?simbolo=${simbolo}&periodo=${periodo}&quantidade=${quantidade}`,
	);
	return await resposta.json();
}
