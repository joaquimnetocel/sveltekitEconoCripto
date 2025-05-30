export async function funcaoFetchDosDados({
	simbolo,
	periodo,
	quantidade,
}: {
	simbolo: string;
	periodo: string;
	quantidade: number;
}) {
	const resposta = await fetch(
		`/examples/alpaca-lightweight-cripto?simbolo=${simbolo}&periodo=${periodo}&quantidade=${quantidade}`,
	);
	return await resposta.json();
}
