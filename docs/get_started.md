# Get Started

To run this program you have to understand JavaScript, Node.js, Express and PostgreSQL. 
This page does not cover the basics and usage of these technologies.

## On Development / Testing

- Configure your local PostgreSQL database at config/db.js
- Create config/email.js file and configure your email
- Set this program to development mode at app.js file around line 10
```js
app.set('env', 'development')
```
- Install nodemon globally and start the program by
```bash
npm run dev
```

## On Production

- Configure admin's email at config/email.js
- (**Important**) Set this program to production mode at app.js file around line 10
```js
app.set('env', 'production')
```
