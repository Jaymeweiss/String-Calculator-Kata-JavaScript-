describe('String Calculator Add', function() {
	const StringCalculator = require('../StringCalculator.js');
	it('should return zero for an empty string', () => {
		expect(StringCalculator.add('')).toEqual(0);
	});

	it('should return the same value for a single number', () => {
		expect(StringCalculator.add('1')).toEqual(1);
	});

	it('should return sum for 2 numbers', () => {
		expect(StringCalculator.add('1,2')).toEqual(3);
	});

	it('should return sum for any number of values', () => {
		expect(StringCalculator.add('1,2,3,4,5')).toEqual(15);
	});

	it('should accept line breaks as delimiter', () => {
		expect(StringCalculator.add('1,2\n3')).toEqual(6);
	});

	it('should accept custom delimiters', () => {
		expect(StringCalculator.add('//#\n1#2#3')).toEqual(6);
	});

	it('should throw an error if a negative number is added', () => {
		expect(function() {
			StringCalculator.add('1,-2,-3,4');
		}).toThrow(new Error('Negative numbers are not allowed: -2, -3'));
	});

	it('should ignore numbers that are larger than 1000', () => {
		expect(StringCalculator.add('1,2,1001,3')).toEqual(6);
	});

	it('should allow multi-length delimiters', () => {
		expect(StringCalculator.add('//[###]\n1###2###3')).toEqual(6);
	});

	it('should allow multiple single delimiters', () => {
		expect(StringCalculator.add('//[@][$]\n1@2$3')).toEqual(6);
	});

	it('should allow multiple multi-length delimiters', () => {
		expect(StringCalculator.add('//[###][%%]\n1###2%%3')).toEqual(6);
	});
});
