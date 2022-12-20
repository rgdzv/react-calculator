import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialStateInterface } from './types'
import { count } from 'utils/countFunction'

const initialState: initialStateInterface = {
    current: '0',
    previous: '0',
    operation: '',
    overwrite: false
}

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        addDigit: (state, action: PayloadAction<string>) => {

            if (state.overwrite === true && action.payload === ',') {
                return {
                    ...state,
                    current: '0,',
                    overwrite: false
                }
            }

            if (state.overwrite === true && action.payload !== ',') {
                return {
                    ...state,
                    current: action.payload,
                    overwrite: false
                }
            }

            if (action.payload === '0' && state.current === '0') {
                return {
                    ...state
                }
            }

            if (state.current.length >= 17) {
                return {
                    ...state
                }
            }

            if (action.payload === ',' && state.current.includes(',')) {
                return {
                    ...state
                }
            }

            if (
                action.payload !== '0' &&
                action.payload !== ',' &&
                state.current === '0'
            ) {
                return {
                    ...state,
                    current: action.payload
                }
            }
                
            state.current = `${state.current}${action.payload}` 
        },
        chooseOperation: (state, action) => {

            if (state.current === '0' && state.previous === '0') {
                return {
                    ...state
                }
            }

            if (state.current === '') {
                return {
                    ...state,
                    operation: action.payload
                }
            }

            if (state.previous === '0') {
                return {
                    ...state,
                    operation: action.payload,
                    previous: state.current,
                    current: ''
                }
            }

            state.previous = count(state)
            state.operation = action.payload
            state.current = ''
        },
        equal: (state) => {
            if (
                state.current === '0' ||
                state.previous === '0' ||
                state.operation === ''
            ) {
                return {
                    ...state
                }
            }

            if (
                state.current === '' && 
                state.previous !== '' && 
                state.operation !== ''
            ) {
                return {
                    ...state,
                    overwrite: true,
                    current: state.previous,
                    operation: '',
                    previous: '0'
                }
            }

            state.overwrite = true,
            state.current = count(state)
            state.operation = ''
            state.previous = '0'
        },
    },
})

export const { addDigit, chooseOperation, equal } = calculatorSlice.actions
export default calculatorSlice.reducer
