import Switcher from '@components/UI/Switcher/Switcher'
import React, { FC, useState } from 'react'
import { calcElemListArray, CalcElemListInterface } from 'utils/buttonArrays'
import styles from './App.module.scss'
import CalcElemLayout from '@components/layout/CalcElemLayout/CalcElemLayout'
import DropElemLayout from '@components/layout/DropElemLayout/DropElemLayout'
import cn from "classnames"
import { DndContext, DragEndEvent } from '@dnd-kit/core'

const App: FC = () => {

    const [selected, setSelected] = useState('Constructor')

    const [droppedElems, setDroppedElems] = useState<CalcElemListInterface[]>([])

    const handleActiveSwitcher = (id: string) => {
        setSelected(id)
    }

    const deleteDroppedElem = (item: CalcElemListInterface) => {
        const filtered = [...droppedElems].filter(elem => elem.id !== item.id)
        setDroppedElems(filtered)
    }

    const leftFieldStyles = cn(styles.left, {
        [styles.hidden]: selected === 'Runtime'
    })

    const calcElementsList = calcElemListArray.map((item) => {

        const index = droppedElems.findIndex(elem => elem.id === item.id)
        const layoutDisabledStyle = index !== -1

        return (
            <CalcElemLayout 
                key={item.id} 
                id={item.id} 
                item={item}
                layoutDisabledStyle={layoutDisabledStyle}
            />
        )
    })

    const handleDragEnd = (event: DragEndEvent) => {

        const { id, list }  = event.active.data.current as CalcElemListInterface
        const elem = {id, list}

        if (event.over && event.over.id === 'droppable') {
            setDroppedElems((prev) => {
                return [...prev, elem]
            })
        }
    }

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <Switcher
                    selected={selected}
                    handleActiveSwitcher={handleActiveSwitcher}
                />
            </div>
            <DndContext
                onDragEnd={handleDragEnd}
            >
                <div className={styles.content}>
                    <div className={leftFieldStyles}>
                        {calcElementsList}
                    </div>
                    <DropElemLayout
                        deleteDroppedElem={deleteDroppedElem}
                        selected={selected}
                        droppedElems={droppedElems}
                        setDroppedElems={setDroppedElems}
                    />
                </div>
            </DndContext>
        </div>
    )
}

export default App
