# Get Started

To run this program you have to understand JavaScript, Node.js, Express and Firestore. 
This page does not cover the basics and usage of these technologies.

## Configure Private Files
- Create config/ directory.
- To use Firestore, generate a service accounts key file from your Firebase project, 
then rename it to "firebase.json" and place it under config directory.
- To send emails, create email.js file under config directory and configure your email like below.
```js
const emailConfig = {
    email: <your-email>,
    password: <your-email-password>,
}

module.exports = emailConfig
```

## On Development / Testing

- Set this program to development mode at app.js file around line 10.
```js
app.set('env', 'development')
```
- Install nodemon globally and start the program by
```bash
npm run dev
```

## On Production

- (**Important**) Set this program to production mode at app.js file around line 10
```js
app.set('env', 'production')
```
