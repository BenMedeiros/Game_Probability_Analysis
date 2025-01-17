# Game Probability Analysis

This project analyzes the probability of winning a game based on various simulations.  This can be extended to handle any number of scenarios by calculating "pascal's triangle formula for diagonal" instead of using brute force scenario calculations to handle larger probability outcome calculations.

## Functions

### `toSuperscript(num)`

Convert a number to its superscript representation.

- **Parameters:**
  - `num` (number): The number to convert.
- **Returns:**
  - `string`: The superscript representation of the number.

### `convertToDecimal(inputStr)`

Convert a string to its decimal representation.

- **Parameters:**
  - `inputStr` (string): The input string to convert.
- **Returns:**
  - `string`: The decimal representation of the input string.

### `runGameOutcomes(outcomes, pointsToWin)`

Run game outcomes and calculate probabilities.

- **Parameters:**
  - `outcomes` (Array): The array to store game outcomes.
  - `pointsToWin` (number): The number of points required to win the game.

## Usage

To use this project, run the `index.js` script. You can modify the number of points required to win in the `pointsToWinStart` and `pointsToWinEnd` variables to see how it affects the probability of winning.

## License

This project is licensed under the MIT License.
