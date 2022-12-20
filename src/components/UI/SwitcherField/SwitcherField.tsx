import React, { FC } from 'react'
import Icon from '@components/UI/Icon/Icon'

interface SwitcherFieldInterface {
    name: string;
    id: string;
    className: string;
    onClick: (id: string) => void
}

const SwitcherField: FC<SwitcherFieldInterface> = ({ name, id, className, onClick }) => {

    const handleClick = () => {
        onClick(id)
    }

    return (
        <div 
            className={className}
            onClick={handleClick}
        >
            <Icon name={name}/>
            <span>{id}</span>
        </div>
    )
}

export default SwitcherField
