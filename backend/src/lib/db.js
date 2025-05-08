import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
     await mongoose.connect(process.env.dbURL);
        console.log('Database connected')
    } catch (error) {
        console.log('Error connecting to database',error)
    };
};