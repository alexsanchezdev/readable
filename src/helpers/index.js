export const timeAgo = (timestamp) => {
    const timeDifference = Date.now() - timestamp
    const timeInSeconds = timeDifference / 1000
    const timeInMinutes = timeInSeconds / 60
    const timeInHours = timeInMinutes / 60
    const timeInDays = timeInHours / 24

    if (timeInSeconds < 60) {
        return `${Math.trunc(timeInSeconds)} seconds ago`
    } if (timeInSeconds >= 60 && timeInSeconds < 3600) {
        return `${Math.trunc(timeInMinutes)} minutes ago`
    } if (timeInMinutes >= 60 && timeInMinutes < 1440) {
        return `${Math.trunc(timeInHours)} hours ago`
    } if (timeInHours >= 24) {
        return `${Math.trunc(timeInDays)} days ago`
    }

}

export const sort = (obj, property, lowestFirst) => {

    if (lowestFirst) {
        obj.sort((a,b) => {
            if (a[property] < b[property])
                return -1;
            if (a[property] > b[property])
                return 1;
            return 0;
        })
    } else {
        obj.sort((a,b) => {
            if (a[property] > b[property])
                return -1;
            if (a[property] < b[property])
                return 1;
            return 0;
        })
    }
    
    return obj
}