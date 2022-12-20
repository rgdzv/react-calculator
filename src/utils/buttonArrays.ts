interface ListInterface {
    name: string
}

export interface CalcElemListInterface {
    id: string;
    list?: ListInterface[]
}

export const calcElemListArray: CalcElemListInterface[] = [
    {
        id: 'result',
    },
    {
        id: 'operators',
        list: [
            {
                name: '/'
            },
            {
                name: 'x'
            },
            {
                name: '-'
            },
            {
                name: '+'
            }
        ]
    },
    {
        id: 'digits',
        list: [
            {
                name: '0'
            },
            {
                name: '1'
            },
            {
                name: '2'
            },
            {
                name: '3'
            },
            {
                name: '4'
            },
            {
                name: '5'
            },
            {
                name: '6'
            },
            {
                name: '7'
            },
            {
                name: '8'
            },
            {
                name: '9'
            },
            {
                name: ','
            }
        ]
    },
    {
        id: 'equal',
        list: [
            {
                name: '='
            }
        ]
    }
]

