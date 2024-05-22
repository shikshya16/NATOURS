const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: './config.env'});

mongoose.connect( process.env.DATABASE)
    .then(conn => console.log('DB Connection Successful!'));


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});









//console.log(app.get('env'));
//console.log(process.env);