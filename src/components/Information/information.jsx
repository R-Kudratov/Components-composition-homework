import PropTypes from 'prop-types'
import styles from './information.module.css'

const InfoLayout = ({ info }) => {
	return <div className={styles.info}>{info}</div>
}

InfoLayout.propTypes = {
	info: PropTypes.string.isRequired,
}

export const Info = ({ info }) => {
	return <InfoLayout info={info} />
}

Info.propTypes = {
	info: PropTypes.string.isRequired,
}
