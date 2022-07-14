import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    database: process.env.DATABASE || 'mongodb://localhost:27017/app-doctor',
    cors: process.env.CORS_ORIGIN
};