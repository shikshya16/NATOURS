const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException' , err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name , err.message);
        process.exit(1);
});


dotenv.config({path: './config.env'});

mongoose.connect( process.env.DATABASE)
    .then(conn => console.log('DB Connection Successful!'));


const port = process.env.port || 3000;
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});


process.on('unhandledRejection' , err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name , err.message);
    server.close(() => {
        process.exit(1);
    });
});





//console.log(app.get('env'));
//console.log(process.env);