import React, { FC } from 'react'
import sprite from '@images/sprite.svg'

interface IconInterface {
    name: string
}

const Icon: FC<IconInterface> = ({ name }) => {
    return (
        <svg>
            <use xlinkHref={`${sprite}${name}`} />
        </svg>
    )
}

export default Icon
