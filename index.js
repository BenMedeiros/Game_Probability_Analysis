/**
 * Convert a number to its superscript representation.
 *
 * @param {number} num - The number to convert.
 * @returns {string} The superscript representation of the number.
 */
const toSuperscript = (num) => {
    const superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    return num.toString().split('').map(char => superscripts[char] || char).join('');
};

/**
 * Convert a string to its decimal representation.
 *
 * @param {string} inputStr - The input string to convert.
 * @returns {string} The decimal representation of the input string.
 */
function convertToDecimal(inputStr) {
    inputStr = inputStr.toString();
    if (inputStr.startsWith('0.')) {
        return inputStr.slice(1);
    }
    return inputStr;
}

/**
 * Run game outcomes and calculate probabilities.
 *
 * @param {Array} outcomes - The array to store game outcomes.
 * @param {number} pointsToWin - The number of points required to win the game.
 */
function runGameOutcomes(outcomes, pointsToWin) {
    function bothSidesScored(goals, goalsAgainst, seq) {
        let game_scored = {
            goals: goals + 1,
            goalsAgainst,
            seq: seq + '1'
        }

        if (game_scored.goals === pointsToWin) {
            game_scored.state = 'W';
            outcomes.push(game_scored);
        } else {
            bothSidesScored(game_scored.goals, game_scored.goalsAgainst, game_scored.seq);
        }

        let game_scored_on = {
            goals,
            goalsAgainst: goalsAgainst + 1,
            seq: seq + '0'
        }

        if (game_scored_on.goalsAgainst === pointsToWin) {
            game_scored_on.state = 'L';
            outcomes.push(game_scored_on);
        } else {
            bothSidesScored(game_scored_on.goals, game_scored_on.goalsAgainst, game_scored_on.seq);
        }

    }

    let game = {
        goals: 0,
        goalsAgainst: 0,
        seq: ''
    };

    bothSidesScored(game.goals, game.goalsAgainst, game.seq);
}



const finalWinProbs = [];
const pointsToWinStart = 1;
const pointsToWinEnd = 10;

// there are alternative computations for optimizing high game scenarios
if(pointsToWinEnd > 13) throw new Error('That will take too long to compute!');

for (let pointsToWin = pointsToWinStart; pointsToWin < pointsToWinEnd; pointsToWin++) {
    const prob_goal = .4;
    const prob_scored_on = 1 - prob_goal;
    const outcomes = [];
    // const pointsToWin = 5;
    console.log('Prob Goal: ', prob_goal);
    console.log('Points to Win: ', pointsToWin);
    runGameOutcomes(outcomes, pointsToWin);

    outcomes.forEach(outcome => {
        outcome.probReadable = convertToDecimal(prob_goal) + toSuperscript(outcome.goals) + convertToDecimal(prob_scored_on) + toSuperscript(outcome.goalsAgainst);
        outcome.prob = Math.pow(prob_goal, outcome.goals) * Math.pow(prob_scored_on, outcome.goalsAgainst);
        // outcome.prob = Math.round(outcome.prob * 100000) / 100000;
    });

    // console.table(outcomes);

    console.log('Total Probabilities: ', outcomes.reduce((acc, outcome) => {
        return acc + outcome.prob;
    }, 0));


    const probWin = outcomes.reduce((acc, outcome) => {
        return acc + (outcome.state === 'W' ? 1 : 0) * outcome.prob;
    }, 0);
    console.log('Prob Win: ', probWin);
    finalWinProbs.push(probWin);

    const probWinReadableCount = outcomes.reduce((acc, outcome) => {
        if (outcome.state === 'W') acc[outcome.probReadable] = (acc[outcome.probReadable] || 0) + 1;
        return acc;
    }, {});

    console.log('Count Prob Win', probWinReadableCount);
    console.log();
}

console.log('Final Win Probs: ', finalWinProbs.map(prob => Math.round(prob * 100000) / 100000));

const dFinalWinProbs = finalWinProbs.map((prob, i) => {
    return i === 0 ? prob : prob - finalWinProbs[i - 1];
});

const ddFinalWinProbs = dFinalWinProbs.map((delta, i) => {
    return i === 0 ? delta : delta - dFinalWinProbs[i - 1];
})

// console.log('Delta Final Win Probs: ', dFinalWinProbs.map(prob => Math.round(prob * 100000) / 100000));
// console.log('Delta Delta Final Win Probs: ', ddFinalWinProbs.map(prob => Math.round(prob * 100000) / 100000));