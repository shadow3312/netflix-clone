const shortenString = (str, limit) => {
    if (str) {
        if (str.length <= limit) {
            return str
        } else {
            const shortened = str.slice(0, limit)+ "..." 
            return shortened
        }
    } else {
        return str
    }
    
    
}

export {shortenString}