import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MusicSchema = Schema({
    id:{type:Number,required: true},
    music_name: { type: String, required: true },
    rating:{type:Number},
    tags:[{type:String}],
    creators:[{type:mongoose.Types.ObjectId,ref:'Users'}],
    intros:[{type:String}],
    year:{type:Number},
    album:{type:String},
    link:{type:String}
}, {
    collection: 'Musics',
})

const Music= mongoose.model('Musics', MusicSchema)

export default Music