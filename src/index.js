require('dotenv').config();
const mongoose = require('mongoose');
const {SeederService} = require('./seeder.service')


let mongoConnection = null; // Keep the connection outside the function for reuse

exports.handler = async (event) => {
    try {
        // Reuse existing connection to prevent cold start delays
        if (!mongoConnection) {
            mongoConnection = await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
        }

        const seeder = new SeederService();
        const count = event.count || 10;
        let reviews = await seeder.seedReview(count);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Reviews seeded successfully',reviews, reviewCount: reviews.length }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

