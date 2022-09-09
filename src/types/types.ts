export type elementType = {
    [key: string] : any
}

export type inputWithLabelProps = elementType & {
    label: string
    inputName?: string,
    className?: string,
    inputClassName?: string,
    [key: string] : any
}