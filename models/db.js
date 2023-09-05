const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../config/firebase.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

function submitEmail(email) {
    db.collection('mailing_list').doc(email).set({
        email: email,
        timestamp: FieldValue.serverTimestamp(),
    });
}

function submitMessage(reqBody, collection) {
    const { senderName, senderEmail, messageBody } = reqBody;

    db.collection(collection).add({
        senderName: senderName,
        senderEmail: senderEmail,
        messageBody: messageBody,
        timestamp: FieldValue.serverTimestamp(),
    });
}

module.exports = { submitEmail, submitMessage }
