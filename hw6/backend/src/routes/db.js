import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
export default {
 connect: () => {mongoose
    .connect('mongodb+srv://blablabla891015:891015Ben@cluster0.ptrzaca.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));}
};