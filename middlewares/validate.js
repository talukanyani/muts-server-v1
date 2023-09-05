function isValidEmail(email) {
    const rangeRegEx = /^.{1,50}$/;
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{1,10})+$/;

    return rangeRegEx.test(email) && emailRegEx.test(email);
}

function isValidName(name) {
    const rangeRegEx = /^.{2,30}$/;
    const nameRegEx = /^[A-Za-z]([ ]?[A-Za-z]+)+$/;

    return rangeRegEx.test(name) && nameRegEx.test(name);
}

function isMessageInRange(message) {
    const rangeRegEx = /^.{30,250}$/;
    return rangeRegEx.test(message);
}

function validateEmail(req, res, next) {
    const { email } = req.body;

    if (isValidEmail(email)) {
        next()
    } else {
        next(new Error('Invalid Email'))
    }
}

function validateMessage(req, res, next) {
    const { senderName, senderEmail, messageBody } = req.body;

    if (isValidName(senderName) && isValidEmail(senderEmail) && isMessageInRange(messageBody)) {
        next();
    } else {
        next(new Error('Invalid message'))
    }
}

module.exports = { validateMessage, validateEmail } 
