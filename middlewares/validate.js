function validateEmail(req, res, next) {
    const rangeRegEx = /^.{1,50}$/
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{1,10})+$/

    const email = req.body.email

    const isValidEmail = rangeRegEx.test(email) && emailRegEx.test(email)

    if (!isValidEmail) {
        next(new Error('Invalid Email'))
    } else {
        next()
    }
}

function validateMessage(req, res, next) {
    const nameRegEx = /^[A-Za-z]([ ]?[A-Za-z]+)+$/
    const nameRangeRegEx = /^.{2,30}$/
    const textRegEx = /^.{30,250}$/

    const reqBody = req.body

    const isValidName = nameRangeRegEx.test(reqBody.name) && nameRegEx.test(reqBody.name)
    const isValidText = textRegEx.test(reqBody.text)

    if (!isValidName || !isValidText) {
        next(new Error('Invalid Name or text'))
    } else {
        next()
    }
}

module.exports = { validateMessage, validateEmail } 
