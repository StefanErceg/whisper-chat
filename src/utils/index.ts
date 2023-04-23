export const formatTime = (timestamp: number) => {
	const date = new Date(timestamp);

	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours}:${minutes}`;
};
