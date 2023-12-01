const input = new URL('.', import.meta.url).pathname + 'input.txt';
const file = await Deno.readTextFile(input);

const lines = file.split('\n');

function extractNumbersFromString(word: string) {
  const numbers = word
    .split('')
    .filter((item) => !isNaN(Number(item)))
    .join('');

  return Number(numbers);
}

function getCalibrationValues(numbers: number) {
  const numbersStr = numbers.toString();
  return Number(numbersStr[0] + numbersStr.slice(-1));
}

function calculateTotal(lines: string[]) {
  const total: number[] = [];

  lines.forEach((word) => {
    const extractedNumber = extractNumbersFromString(word);
    const calibrationValues = getCalibrationValues(extractedNumber);
    total.push(calibrationValues);
  });

  return total.reduce((acc, curr) => acc + curr, 0);
}

// ⭐️ First half
console.log(calculateTotal(lines));
