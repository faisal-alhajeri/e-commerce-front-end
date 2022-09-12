
export type elementType = {
    className?: string,
    [key: string] : any
}

export enum messegesTypes {
    ERROR='danger',
    SUCCESS= 'success'
}

export type flashMessegeType = {
    id: string,
    messege: string
    type: messegesTypes
}