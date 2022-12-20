import React, { FC } from 'react'
import styles from './OperationButton.module.scss'

interface OperationButtonInterface {
    name: string;
}

const OperationButton: FC<OperationButtonInterface> = ({ name }) => {
    return (
        <button className={styles.operationButton}>{name}</button>
    )
}

export default OperationButton