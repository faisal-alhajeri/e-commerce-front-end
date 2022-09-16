
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

export type userType = {
    id?: string,
    name?: string
    email?: string
} | undefined


export type anyObject = {
    [key: string]: any
}

export enum inputValidationTypes{
    VALID='valid',
    NOT_VALID='not_valid',
    NEUTRAL='NEUTRAL'
} 

export type tokenstype = {
    access: string,
    refresh: string
}