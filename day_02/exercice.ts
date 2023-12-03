const input = new URL('.', import.meta.url).pathname + 'input.txt';
const file = await Deno.readTextFile(input);

const lines = file.split('\n');

const RED = 12;
const GREEN = 13;
const BLUE = 14;

function calculateSumByGame(array: RegExpMatchArray | null) {
  return array ? array.reduce((acc, curr) => acc + parseInt(curr), 0) : 0;
}

function firstPart(lines: string[]) {
  const IDs: number[] = [];

  for (const line of lines) {
    const id = parseInt(line.match(/Game\s(\d+)/)![1]);
    const subsets = line.split(': ')[1].split('; ');

    let nbOfRedByGame = 0;
    let nbOfGreenByGame = 0;
    let nbOfBlueByGame = 0;

    for (const game of subsets) {
      nbOfRedByGame = calculateSumByGame(game.match(/\d+\sred/g));
      nbOfGreenByGame = calculateSumByGame(game.match(/\d+\sgreen/g));
      nbOfBlueByGame = calculateSumByGame(game.match(/\d+\sblue/g));
    }

    if (
      RED >= nbOfRedByGame &&
      GREEN >= nbOfGreenByGame &&
      BLUE >= nbOfBlueByGame
    ) {
      IDs.push(id);
    }
  }

  return IDs.reduce((acc, curr) => (acc += curr), 0);
}

console.log('⭐️ First Part : ', firstPart(lines));
