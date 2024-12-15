import { useEffect, useState } from "react";


const useTicTacToe = () => {
    const [tiles, setTiles] = useState(3);
    const initialBoard = () => Array(tiles * tiles).fill(null);
    const [board, setBoard] = useState([]);
    const [isXNext, setIsXNext] = useState(true);

    useEffect(() => {
        setBoard(Array(tiles * tiles).fill(null));
    }, [tiles]);

    const calculateWinner = (currentBoard) => {

        const len = tiles;

        //? Row check
        for (let row = 1; row <= len; row++) {
            let firstIndex = (len * row) - len;
            const element = currentBoard[firstIndex]; //? first element of the row
            if (element === null) continue; // Skip rows with no valid player
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
            if (element === null) continue; // Skip rows with no valid player
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


        //? Principle Diagonal check
        let firstElement = currentBoard[0];
        if (firstElement !== null) {
            let allMatch = true;
            for (let i = 2, j = len - 1; i <= len && j > 0; i++, j--) {
                let index = (len * i) - j;
                if (currentBoard[index] != firstElement) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) return firstElement;
        }

        //? Secondary Diagonal check
        firstElement = currentBoard[(len * 1) - 1];
        if (firstElement !== null) {
            let allMatch = true;
            for (let i = 2; i <= len; i++) {
                let index = (len * i) - i;
                if (currentBoard[index] != firstElement) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) return firstElement;
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

    const totalTiles = (value) => {
        setTiles(value);
        resetGame();
    }

    return { board, handleClick, getStatusMsg, resetGame, totalTiles };
}

export default useTicTacToe;