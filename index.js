const toSuperscript = (num) => {
    const superscripts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    return num.toString().split('').map(char => superscripts[char] || char).join('');
};

function convertToDecimal(inputStr) {
    inputStr = inputStr.toString();
    if (inputStr.startsWith('0.')) {
        return inputStr.slice(1);
    }
    return inputStr;
}


function runGameOutcomes(pointsToWin) {
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



const prob_goal = .4;
const prob_scored_on = 1 - prob_goal;
const outcomes = [];
runGameOutcomes(2);

outcomes.forEach(outcome => {
    outcome.probReadable = convertToDecimal(prob_goal) + toSuperscript(outcome.goals) + convertToDecimal(prob_scored_on) + toSuperscript(outcome.goalsAgainst);
    outcome.prob = Math.pow(prob_goal, outcome.goals) * Math.pow(prob_scored_on, outcome.goalsAgainst);
    outcome.prob = Math.round(outcome.prob * 10000) / 10000;
});

console.table(outcomes);

console.log('Total Probabilities: ', outcomes.reduce((acc, outcome) => {
    return acc + outcome.prob;
}, 0));

console.log('Expected Value: ', outcomes.reduce((acc, outcome) => {
    return acc + (outcome.state === 'W' ? 1 : 0) * outcome.prob;
}, 0));