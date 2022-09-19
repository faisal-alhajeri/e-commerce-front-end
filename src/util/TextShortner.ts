export let shortenText = (text: string, length: number): string => {
    let res = text.length >= length? text.slice(0, length).split(' ') : text;  
    if (text.length >= length){
        let temp = text.slice(0, length).split(' ')
        temp.pop()
        res = temp.join(' ') + ' ... '
    } else {
        res = text
    }
    return res 
}