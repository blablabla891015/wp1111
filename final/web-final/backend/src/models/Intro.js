import mongoose from 'mongoose'

const Schema = mongoose.Schema

const IntroSchema = Schema({
    Title: { type: String, required: true },
    SubTitle: { type: String},
    Paragraphs:[{type:String}],
    user:{type:mongoose.Types.ObjectId,ref:'Users'}
}, {
    collection: 'Intros',
})

const Intro= mongoose.model('Intros', IntroSchema)

export default Intro