import { initialStateInterface } from "store/types"

export const count = (state: initialStateInterface) => {
    const previous = parseFloat(state.previous.replace(',', '.'))
    const current = parseFloat(state.current.replace(',', '.'))

    if (isNaN(previous) || isNaN(current)) return ''

    let result = 0

    switch (state.operation) {
        case '+':
            result = previous + current
            break
        case '-':
            result = previous - current
            break
        case 'x':
            result = previous * current
            break
        case '/':
            result = previous / current
            break
    }

    let roundedResult = Math.round((result + Number.EPSILON) * 100) / 100
    
    return roundedResult.toString().replace('.', ',')
}