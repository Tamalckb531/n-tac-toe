import { useState } from "react";

const initialBoard = () => Array(9).fill(null);

const useTicTacToe = () => {
    const [board, setBoard] = useState(initialBoard());

    const [isXNext, setIsXNext] = useState(true);

    const WINNING_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // const calculateWinner = (currentBoard) => {
    //     for (let i = 0; i < WINNING_PATTERNS.length; i++) {
    //         const [a, b, c] = WINNING_PATTERNS[i];

    //         if (currentBoard[a] &&
    //             currentBoard[a] === currentBoard[b] &&
    //             currentBoard[a] === currentBoard[c]
    //         ) {
    //             return currentBoard[a];
    //         }
    //     }


    //     return null;
    // }

    const calculateWinner = (currentBoard) => {

        const len = 3;

        //? Row check
        for (let row = 1; row <= len; row++) {
            let firstIndex = (len * row) - len;
            const element = currentBoard[firstIndex]; //? first element of the row
            let allMatch = true;
            for (let col = len - 1; col > 0; col--) {
                const index = (len * row) - col;
                if (currentBoard[index] != element) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) return element;
        }

        //? column check
        for (let col = len; col > 0; col--) {
            let firstIndex = (len * 1) - col;
            const element = currentBoard[firstIndex];
            let allMatch = true;
            for (let row = 2; row <= len; row++) {
                const index = (len * row) - col;
                if (currentBoard[index] != element) {
                    allMatch = false;
                    break;
                }
            }

            if (allMatch) return element;
        }

        //? Diagonal check
        const firstElement = currentBoard[0];
        for (let i = 2, j = len - 1; i <= len && j > 0; i++, j--) {
            let index = (len * i) - j;
            if (currentBoard[index] != firstElement) {
                break;
            }
            return firstElement;
        }

        return null;
    }

    const handleClick = (index) => {
        const winner = calculateWinner(board);
        if (winner || board[index]) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "0";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    }

    const getStatusMsg = () => {
        const winner = calculateWinner(board);
        if (winner) return `Player ${winner} wins!`;
        if (!board.includes(null)) return `It's a draw!`;
        return `Player ${isXNext ? "X" : "0"} turn`;

    }

    const resetGame = () => {
        setBoard(initialBoard());
        setIsXNext(true);
    }

    return { board, handleClick, getStatusMsg, resetGame };
}

export default useTicTacToe;