var isValidSudoku = function(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== ".") {
                let result = check(i, j, board[i][j], board);
                if (result === false) {
                    return false;
                }
            }
        }
    }
    return true;
};

function check(i, j, character, board) {
    for (let x = 0; x < 9; x++) {
        if (x === i) {
            continue;
        }
        if (board[x][j] === character) {
            return false;
        }
    }
    for (let y = 0; y < 9; y++) {
        if (y === j) {
            continue;
        }
        if (board[i][y] === character) {
            return false;
        }
    }
    let xi = parseInt(i / 3) * 3;
    let yj = parseInt(j / 3) * 3;

    for (let x = xi; x < xi + 3; x++) {
        for (let y = yj; y < yj + 3; y++) {
            if (x === i && y === j) {
                continue;
            }
            if (board[x][y] === character) {
                return false;
            }
        }
    }
    return true;
}

function sudokuSolve(i, j, board) {
    let newBoard = board.map(row => [...row]);

    if (i >= 9) {
        if (isValidSudoku(board) === false) {
            return null;
        }
        return board;
    }

    let y = i;
    let x = j;

    if (isValidSudoku(board) === false) {
        newBoard[i][j] = '.';
        return null;
    }

    // Increment x and y values accordingly
    if (j === 8) {
        x = 0;
        y = i + 1;
    } else {
        x = j + 1;
    }

    // If the current space is an empty space
    if (board[i][j] === '.') {
        // For each number 1-9
        for (let k = 1; k < 10; k++) {
            // Try a number
            newBoard[i][j] = k.toString();
            let result = sudokuSolve(y, x, newBoard);
            // Stop everything if we have a good board, continue if not.
            if (result !== null) {
                return result;
            }
        }
        // Tried all numbers and nothing worked
        newBoard[i][j] = '.';
        return null;
    } else {
        return sudokuSolve(y, x, newBoard);
    }
}

let board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];

console.log(isValidSudoku(board));
console.log(sudokuSolve(0, 0, board));
