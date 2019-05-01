import React from 'react'
import styles from './tooltip.module.scss'

export default ({ tooltipText }) => {
  return (
    <span className={styles.tooltip}>
      {tooltipText}
    </span>
  )
}