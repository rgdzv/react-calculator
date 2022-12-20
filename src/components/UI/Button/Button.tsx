import React, { FC } from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import { useAppDispatch } from 'store/store'
import { addDigit, chooseOperation, equal } from 'store/calculatorSlice'

interface ButtonInterface {
    elem: string;
    selected: string
}

const Button: FC<ButtonInterface> = ({ elem, selected }) => {

    const dispatch = useAppDispatch()

    const buttonStyle = cn(styles.button, {
        [styles.one]: elem === '1',
        [styles.two]: elem === '2',
        [styles.three]: elem === '3',
        [styles.four]: elem === '4',
        [styles.five]: elem === '5',
        [styles.six]: elem === '6',
        [styles.seven]: elem === '7',
        [styles.eight]: elem === '8',
        [styles.nine]: elem === '9',
        [styles.zero]: elem === '0',
        [styles.coma]: elem === ',',
        [styles.equal]: elem === '=',
        [styles.runtime]: selected === 'Runtime'
    })

    const handleClick = () => {

        const operationsArray = ['+', '-', 'x', '/']
        const isIncluded = operationsArray.includes(elem)

        isIncluded 
            ? 
                dispatch(chooseOperation(elem)) 
            : 
                elem === '=' 
            ? 
                dispatch(equal()) 
            : 
                dispatch(addDigit(elem))
    }

    const onClick = selected === 'Runtime' ? handleClick : undefined

    return (
        <button 
            className={buttonStyle}
            onClick={onClick}
        >
            {elem}
        </button>
    )
}

export default Button