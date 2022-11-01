import express from 'express'; 
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 4000;
mongoose
 .connect('mongodb+srv://blablabla891015:891015Ben@cluster0.ptrzaca.mongodb.net/?retryWrites=true&w=majority', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 })
 .then((res) => console.log("mongo db connection created"));
app.get('/', (req, res) => {
 res.send('Hello, World!');
});
app.listen(port, () =>
 console.log(`scorecard app listening on port ${port}!`),
);