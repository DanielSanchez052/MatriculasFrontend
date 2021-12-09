export const validators = {

    validateEmail: (text) => {
        let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        return regex.test(text)
    },
    validateNumber: (text) => {
        let regex = /^\d+$/
        return regex.test(text)
    },
    validateText: (text) => {
        let regex = /[a-zA-Z]+$/
        return regex.test(text)
    },
}