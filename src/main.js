require('dotenv').config();
const mongoose = require('mongoose');
const {SeederService} = require('./seeder.service')





async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    const seeder = new SeederService();
    await seeder.seedReview(10);
    await mongoose.disconnect();

}

main();

