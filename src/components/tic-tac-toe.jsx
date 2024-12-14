import useTicTacToe from '../hooks/use-tic-tac-toe';

function TicTacToe() {
    const { board, getStatusMsg, handleClick, resetGame } = useTicTacToe();
    console.log(board);

    return (
        <div className='game'>
            <div className="status">
                {getStatusMsg()}
                <button
                    className='reset-button'
                    onClick={resetGame}
                >
                    Reset Game
                </button>
            </div>

            <div className="board">
                {board.map((brd, index) => {
                    return (
                        <button
                            className="cell"
                            key={index}
                            onClick={() => handleClick(index)}
                        >
                            {brd}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default TicTacToe
