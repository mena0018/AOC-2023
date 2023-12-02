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

function firstPart(lines: string[]) {
  const total: number[] = [];

  lines.forEach((word) => {
    const extractedNumber = extractNumbersFromString(word);
    const calibrationValues = getCalibrationValues(extractedNumber);
    total.push(calibrationValues);
  });

  return total.reduce((acc, curr) => acc + curr, 0);
}

//**************************** SECOND PART **************************** */

const NUMBERS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function replaceWordsWithNumbers(line: string) {
  for (const numStr of Object.keys(NUMBERS)) {
    line = line.replaceAll(numStr, String(NUMBERS[numStr]));
  }
  return line;
}

function secondPart(lines: string[]) {
  const total: number[] = [];

  for (let line of lines) {
    line = replaceWordsWithNumbers(line);
    const extractedNumber = extractNumbersFromString(line);
    const calibrationValues = getCalibrationValues(extractedNumber);
    total.push(calibrationValues);
  }

  return total.reduce((acc, curr) => acc + curr, 0);
}

console.log('⭐️ First Part : ', firstPart(lines));
console.log('⭐️⭐️  Second Part : ', secondPart(lines));
