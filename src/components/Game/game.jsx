import PropTypes from 'prop-types'
import { useState } from 'react'

import { Field } from '../Filed/Field'
import { Info } from '../Information/information'

import styles from './game.module.css'

const RestartButton = ({ restart }) => {
	return (
		<button className={styles.restart} onClick={restart}>
			Начать заново
		</button>
	)
}

RestartButton.propTypes = {
	restart: PropTypes.func.isRequired,
}

const GameLayout = ({ field, info, restart, onClickCell }) => {
	return (
		<div className={styles.wrapper}>
			<Info info={info} />
			<Field field={field} onClickCell={onClickCell} />
			<RestartButton restart={restart} />
		</div>
	)
}

GameLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	info: PropTypes.string.isRequired,
	restart: PropTypes.func.isRequired,
	onClickCell: PropTypes.func.isRequired,
}

export const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X')
	const [isGameEnded, setIsGameEnded] = useState(false)
	const [isDraw, setIsDraw] = useState(false)
	const [field, setField] = useState(['', '', '', '', '', '', '', '', ''])

	const restartGame = () => {
		setField(['', '', '', '', '', '', '', '', ''])
		setCurrentPlayer('X')
		setIsGameEnded(false)
		setIsDraw(false)
	}

	const checkWin = (currenFieldState) => {
		const winLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		for (let i = 0; i < winLines.length; i++) {
			const [a, b, c] = winLines[i]
			if (
				currenFieldState[a] &&
				currenFieldState[a] === currenFieldState[b] &&
				currenFieldState[a] === currenFieldState[c]
			) {
				return true
			}
		}
	}

	const onClickCell = (index) => {
		if (field[index] === '' && !isGameEnded) {
			const newField = [...field]
			newField[index] = currentPlayer
			setField(newField)

			if (checkWin(newField)) {
				setIsGameEnded(true)
				return
			}

			if (!newField.includes('')) {
				setIsGameEnded(true)
				setIsDraw(true)
				return
			}

			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
		}
	}

	const currentInfo = () => {
		if (isDraw) {
			return 'Ничья'
		} else if (isGameEnded) {
			return `Победа: ${currentPlayer}`
		} else {
			return `Ходит: ${currentPlayer}`
		}
	}

	return (
		<GameLayout
			field={field}
			info={currentInfo()}
			restart={restartGame}
			onClickCell={onClickCell}
		/>
	)
}
