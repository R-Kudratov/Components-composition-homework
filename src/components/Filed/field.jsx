import PropTypes from 'prop-types'
import styles from './Field.module.css'

const FieldLayout = ({ field, onClickCell }) => {
	return (
		<div className={styles.table}>
			{field.map((item, index) => {
				return (
					<span key={index} onClick={() => onClickCell(index)}>
						{item}
					</span>
				)
			})}
		</div>
	)
}

FieldLayout.protoTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClickCell: PropTypes.func.isRequired,
}

export const Field = ({ field, onClickCell }) => {
	return <FieldLayout field={field} onClickCell={onClickCell} />
}

Field.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClickCell: PropTypes.func.isRequired,
}
