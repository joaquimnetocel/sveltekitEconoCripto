export function functionFormatDate(timestamp: number) {
	// return new Date(timestamp * 1000).toISOString().split('T')[0];
	return new Date(timestamp * 1000).toISOString();

	// const date = new Date(timestamp);

	// // Formatar a data no formato: dd/mm/yyyy
	// return new Intl.DateTimeFormat('en').format(date);
}
