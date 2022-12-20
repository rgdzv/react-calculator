import React, { FC } from 'react'
import styles from './Switcher.module.scss'
import SwitcherField from '@components/UI/SwitcherField/SwitcherField'
import cn from "classnames"
import { fieldsArray } from 'utils/fieldsArray'

interface SwitcherInterface {
    selected: string;
    handleActiveSwitcher: (id: string) => void
}

const Switcher: FC<SwitcherInterface> = ({ selected, handleActiveSwitcher }) => {

    const fields = fieldsArray.map(field => {

        const res = cn({
            [styles.runtime]: field.id === 'Runtime',
            [styles.construct]: field.id === 'Constructor',
            [styles.active]: selected === field.id,
        })
        
        return (
            <SwitcherField
                key={field.id}
                id={field.id}
                name={field.iconName}
                className={res}
                onClick={handleActiveSwitcher}
            />
        )
    })

    return (
        <div className={styles.switcher}>
            {fields}
        </div>
    )
}

export default Switcher
