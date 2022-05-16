let value = 0

const run = () => {

    setInterval(() => {
        value++
    }, 1000)
}


const getValue = () => value


const getAsyncValue = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(5)
        }, 4000)
    })
}


module.exports = {
    getAsyncValue,
    getValue,
    run
}