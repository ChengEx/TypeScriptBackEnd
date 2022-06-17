import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = "mongodb+srv://denoriaaa:SQ3No7zNIIwTmSBI@cluster0.hnuu7.mongodb.net/ThesisDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 4000;

export const config = {
    mongo: {
        url: MONGODB_URL
    },
    server: {
        port: PORT
    }
};