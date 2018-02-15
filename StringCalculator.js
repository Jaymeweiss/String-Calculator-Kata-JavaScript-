function StringCalculator() {}

StringCalculator.add = function add(instruction) {
	const numbers = getNumbersString(instruction)
		.split(getSplitterRegex(instruction))
		.map(i => Number(i));
	handleNegativeNumbers(numbers);
	return numbers.filter(i => i < 1001).reduce((prev, curr) => prev + curr, 0);
};

function getNumbersString(instruction) {
	const numberStringMatch = RegExp('//(.*)\n(.*)').exec(instruction);
	return numberStringMatch !== null ? numberStringMatch[2] : instruction;
}

function getSplitterRegex(instruction) {
	let splitterRegex = RegExp('[,\n]');
	const splitterMatch = RegExp('//(.*)\n(.*)').exec(instruction);
	if (splitterMatch !== null) {
		const multiLengthDelimMatch = RegExp('\\[(.*)\\]').exec(splitterMatch[1]);
		splitterRegex =
			multiLengthDelimMatch !== null
				? RegExp(
						'[' +
							multiLengthDelimMatch[1].split(RegExp('\\]\\[')).join('') +
							']'
					)
				: RegExp('[' + splitterMatch[1] + ']');
	}
	return splitterRegex;
}

function handleNegativeNumbers(numbers) {
	const negativeNumbers = numbers.filter(i => i < 0);
	if (negativeNumbers.length > 0) {
		throw new Error(
			'Negative numbers are not allowed: ' + negativeNumbers.join(', ')
		);
	}
}

module.exports = StringCalculator;
