export function formatReadableDateTime(providedDateTime) {
	let date = new Date(providedDateTime);
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	};

	return date.toLocaleString('en-US', options);
}
