import React, { FC } from 'react'
import styles from './DropElemLayout.module.scss'
import { CalcElemListInterface } from 'utils/buttonArrays'
import CalcElemLayout from '../CalcElemLayout/CalcElemLayout'
import Icon from '@components/UI/Icon/Icon'
import { useDroppable } from '@dnd-kit/core'
import { DndContext, DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface DropElemLayoutInterface {
    deleteDroppedElem: (item: CalcElemListInterface) => void;
    selected: string;
    droppedElems: CalcElemListInterface[];
    setDroppedElems: React.Dispatch<React.SetStateAction<CalcElemListInterface[]>>
}

const DropElemLayout: FC<DropElemLayoutInterface> = ({ selected, droppedElems, deleteDroppedElem, setDroppedElems }) => {

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable'
    })

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const droppedRuntimeElemList = droppedElems.map((item) => {

        const layoutEnabledStyle = droppedElems.length ? true : false

        return (
            <CalcElemLayout 
                key={item.id}
                id={item.id}
                item={item}
                deleteDroppedElem={deleteDroppedElem} 
                selected={selected}
                layoutEnabledStyle={layoutEnabledStyle}
            />
        )
    })

    const droppedElemList = !droppedElems.length
        ?
            <div className={styles.rightContent}>
                <Icon name="#drop"/>
                <p>Перетащите сюда</p>
                <span>любой элемент</span>
                <span>из левой панели</span>
            </div>
        :
            droppedRuntimeElemList

    const className = !droppedElems.length ? styles.right : styles.left

    const style = {
        backgroundColor: (isOver && !droppedElems.length) ? '#F0F9FF' : '',
        borderBottom: (droppedElems.length && isOver) ? '2px solid #5D5FEF' : ''
    }

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.active.id !== event.over?.id) {
            setDroppedElems((items: CalcElemListInterface[]) => {
                const oldIndex = items.findIndex(item => item.id === event.active?.id)
                const newIndex = items.findIndex(item => item.id === event.over?.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    return (
        <DndContext
            onDragEnd={handleDragEnd} 
            sensors={sensors} 
            collisionDetection={closestCenter}
        >
            <div 
                ref={setNodeRef} 
                className={className}  
                style={style}
            >
                <SortableContext
                    items={droppedElems}
                    strategy={verticalListSortingStrategy}
                >
                    {droppedElemList}
                </SortableContext>
            </div>
        </DndContext>
    )
}

export default DropElemLayout