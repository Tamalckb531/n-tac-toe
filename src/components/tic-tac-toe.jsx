import { useState } from 'react';
import useTicTacToe from '../hooks/use-tic-tac-toe';

function TicTacToe() {
    const { board, getStatusMsg, handleClick, resetGame, totalTiles } = useTicTacToe();
    const [value, setValue] = useState(3);
    const [tiles, setTiles] = useState(3);

    const handleSubmit = () => {
        let newValue = parseInt(value, 10);
        if (newValue > 2 && newValue <= 6) {
            totalTiles(newValue);
            setTiles(newValue);
        } else if (newValue <= 0) {
            alert("Ever heard of number theory? Insert a damnn positive integer")
        } else if (newValue <= 2) {
            alert("Life is short, But not that short. Give more than 2 value as input")
        } else if (newValue > 6) {
            alert("You unemployed bro? Keep the range within 3 to 6.")
        } else {
            alert("TF is that ?")
        }
    }
    return (
        <div className='game'>

            <div className="tiles">
                <h1>How many tiles do you need ?</h1>
                <input
                    type="text"
                    id="tiles"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={handleSubmit}>submit</button>
            </div>

            <div className="status">
                {getStatusMsg()}
                <button
                    className='reset-button'
                    onClick={resetGame}
                >
                    Reset Game
                </button>
            </div>

            <div className="board"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${tiles}, 1fr)`,
                    justifyContent: 'center'
                }}
            >
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
        </div >
    )
}

export default TicTacToe
