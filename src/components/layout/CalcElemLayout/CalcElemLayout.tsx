import cn from 'classnames'
import React, { FC } from 'react'
import styles from './CalcElemLayout.module.scss'
import Button from '@components/UI/Button/Button'
import { CalcElemListInterface } from 'utils/buttonArrays'
import { useAppSelector } from 'store/store'
import { CSS } from '@dnd-kit/utilities'
import { DragOverlay } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'

interface CalcElemLayoutInterface {
    item: CalcElemListInterface;
    id: string;
    deleteDroppedElem?: (item: CalcElemListInterface) => void;
    selected?: string;
    layoutDisabledStyle?: boolean;
    layoutEnabledStyle?: boolean;
}

const CalcElemLayout: FC<CalcElemLayoutInterface> = ({ item, id, deleteDroppedElem, selected, layoutDisabledStyle, layoutEnabledStyle }) => {

    const { current } = useAppSelector(state => state.calculator)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: id,
        data: {...item},
        disabled: selected === 'Runtime',
    })

    const handleDeleteDroppedElem = () => {
        deleteDroppedElem?.(item)
    }

    const doubleClickCondition = selected === 'Constructor' ? handleDeleteDroppedElem : undefined

    const layoutStyle = cn(styles.elemLayout, {
        [styles.operators]: item.id === 'operators',
        [styles.digits]: item.id === 'digits',
        [styles.equal]: item.id === 'equal',
        [styles.disabled]: layoutDisabledStyle,
        [styles.enabled]: layoutEnabledStyle,
        [styles.transparent]: isDragging 
    })

    const style = {
        transform: CSS.Translate.toString(transform),
        transition: transition
    } 

    const buttonList = item.list?.map(elem => (
        <Button 
            key={elem.name} 
            elem={elem.name}
            selected={selected!}
        />
    ))

    const resultStyle = cn(styles.result, {
        [styles.minified]: current.length >= 10
    })

    const elemList = item.id === 'result'
        ? 
            <div className={resultStyle}>{current}</div>
        :
            buttonList

    const dragOverlayContent = isDragging 
        ?
            <div 
                className={layoutStyle} 
                style={{
                    opacity: isDragging ? '1' : '',
                    boxShadow: isDragging ? '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)' : ''
                }}
            >
                {elemList}
            </div> 
        : 
            null

    return (
        <>
            <div 
                ref={setNodeRef} 
                className={layoutStyle}
                onDoubleClick={doubleClickCondition}
                style={style}
                {...attributes}
                {...listeners}
            >
                {elemList}
            </div>
            <DragOverlay dropAnimation={null}>
                {dragOverlayContent}
            </DragOverlay>
        </>
    )
}

export default CalcElemLayout