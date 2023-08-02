export const generateRandomNumber = (start: number = 0, end: number = 10): number => {
	if (typeof start != 'number' || typeof end != 'number') throw new Error('Range start and end must be numbers!');

	const randomNumber = Math.random();

	const scaledNumber = randomNumber * (end - start);
	const shiftedNumber = scaledNumber + start;
	const wholeNumber = Math.floor(shiftedNumber);

	return wholeNumber;
};
