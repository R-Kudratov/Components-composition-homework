import { useState } from 'react'
import styles from './App.module.css'

export const App = () => {
	const [value, setValue] = useState('')
	const [list, setList] = useState([])
	const [error, setError] = useState('')

	const isValueValid = value.length >= 3
	const isListEmpty = list.length == 0

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение')
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа')
		} else {
			setValue(promptValue)
			setError('')
		}
	}

	const onAddButtonClick = () => {
		if (isValueValid) {
			setList((list) => [
				...list,
				{
					id: Date.now(),
					value,
				},
			])
			setValue('')
			setError('')
		}
	}

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>:
				<output className={styles['current-value']}> {value}</output>
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']} hidden={!isListEmpty}>
					Нет добавленных элементов
				</p>
				<ul className={styles.list}>
					{list.map((item) => (
						<li className={styles['list-item']} key={item.id}>
							{item.value}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
