export function functionFormatDate(timestamp: number) {
	return new Date(timestamp * 1000).toISOString().split('T')[0];
}
