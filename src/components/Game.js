import React, { Component } from 'react'

class Game extends Component {
    state = {
        player1: 1,
        player2: 2,
        currentPlayer: null,
        gameBoard: [],
        gameOver: false,
        message: ''
    }

    createGameBoard = () => {
        let gameBoard = []

        for (let r = 0; r < 6; r++) {
            let row = []

            for (let c = 0; c < 7; c++) {
                row.push(null)
            }
            gameBoard.push(row)
        }

        this.setState({
            gameBoard,
            currentPlayer: this.state.player1,
            gameOver: false,
            message: ''
        })
    }

    switchPlayer = () => {
        return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1
    }

    playGame = (c) => {
        if (!this.state.gameOver) {
            let gameBoard = this.state.gameBoard

            for (let r = 5; r >= 0; r--) {
                if (!gameBoard[r][c]) {
                    gameBoard[r][c] = this.state.currentPlayer
                    break
                }
            }

            let result = this.checkForWinner(gameBoard)
            this.setGameMessage(gameBoard, result)
        } else {
            this.setState({ message: 'Game over. Please start a new game.' })
        }
    }

    setGameMessage = (gameBoard, result) => {
        switch(result) {
            case this.state.player1:
                this.setState({ gameBoard, gameOver: true, message: 'Player 1 (red) wins!' })
                break
            case this.state.player2:
                this.setState({ gameBoard, gameOver: true, message: 'Player 2 (black) wins!' })
                break
            case 'draw':
                this.setState({ gameBoard, gameOver: true, message: 'Draw game.' })
                break
            default:
                this.setState({ gameBoard, currentPlayer: this.switchPlayer() })
        }
    }

    verticalWinner = (gameBoard) => {
        for (let r = 3; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                if (gameBoard[r][c]) {
                    if (gameBoard[r][c] === gameBoard[r - 1][c] &&
                        gameBoard[r][c] === gameBoard[r - 2][c] &&
                        gameBoard[r][c] === gameBoard[r - 3][c]) {
                        return gameBoard[r][c]
                    }
                }
            }
        }
    }

    horizontalWinner = (gameBoard) => {
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (gameBoard[r][c]) {
                    if (gameBoard[r][c] === gameBoard[r][c + 1] &&
                        gameBoard[r][c] === gameBoard[r][c + 2] &&
                        gameBoard[r][c] === gameBoard[r][c + 3]) {
                        return gameBoard[r][c]
                    }
                }
            }
        }
    }

    diagonalRightWinner = (gameBoard) => {
        for (let r = 3; r < 6; r++) {
            for (let c = 0; c < 4; c++) {
                if (gameBoard[r][c]) {
                    if (gameBoard[r][c] === gameBoard[r - 1][c + 1] &&
                        gameBoard[r][c] === gameBoard[r - 2][c + 2] &&
                        gameBoard[r][c] === gameBoard[r - 3][c + 3]) {
                        return gameBoard[r][c]
                    }
                }
            }
        }
    }

    diagonalLeftWinner = (gameBoard) => {
        for (let r = 3; r < 6; r++) {
            for (let c = 3; c < 7; c++) {
                if (gameBoard[r][c]) {
                    if (gameBoard[r][c] === gameBoard[r - 1][c - 1] &&
                        gameBoard[r][c] === gameBoard[r - 2][c - 2] &&
                        gameBoard[r][c] === gameBoard[r - 3][c - 3]) {
                        return gameBoard[r][c]
                    }
                }
            }
        }
    }

    isDraw = (gameBoard) => {
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                if (gameBoard[r][c] === null) {
                    return null
                }
            }
        }

        return 'draw'
    }

    checkForWinner = (gameBoard) => {
        return this.verticalWinner(gameBoard) ||
            this.diagonalRightWinner(gameBoard) ||
            this.diagonalLeftWinner(gameBoard) ||
            this.horizontalWinner(gameBoard) ||
            this.isDraw(gameBoard)
    }

    componentWillMount() {
        this.createGameBoard()
    }

    render() {
        return (
            <div>
                <div className="button" onClick={() => {this.createGameBoard()}}>New Game</div>

                <table>
                    <tbody>
                        {this.state.gameBoard.map((row, i) =>
                            <Row key={i} row={row} play={this.playGame} />
                        )}
                    </tbody>
                </table>

                <p className="message">{this.state.message}</p>
            </div>
        )
    }
}

const Row = ({ row, play }) => {
    return (
        <tr>
            {row.map((cell, i) =>
                <Cell key={i} value={cell} columnIndex={i} play={play} />
            )}
        </tr>
    )
}

const Cell = ({ value, columnIndex, play }) => {
    let color = 'white'
    if (value === 1) {
        color = 'red'
    } else if (value === 2) {
        color = 'black'
    }

    return (
        <td>
            <div className="cell" onClick={() => {play(columnIndex)}}>
                <div className={color}/>
            </div>
        </td>
    )
}

export default Game
