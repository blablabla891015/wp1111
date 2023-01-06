import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
    id:{type:Number,required: true},
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    img_url: { type: String, required: false },
    rating:{type:Number,required:true},
    tags:[{type:String}],
    intros:[{type:String}],
    musics:[{type:mongoose.Types.ObjectId,ref:'Musics'}],
    opportunities:[{type:mongoose.Types.ObjectId,ref:'Opportunities'}],
    user_cv:[{
        user_cv_time:{type:String},
        user_cv_event:{type:String},
        user_cv_note:{type:String}
    }],
    user_contact : {
        user_contact_email:{type:String},
        user_contact_phone: {type:String},
        user_contact_address: {type:String},
        user_contact_links:{
            ig_link: {type:String},
            yt_link: {type:String},
            tw_link: {type:String},
            fb_link: {type:String},
        }
    },
    user_hubs:[{
        accepted:{type:Boolean},
        hub:{type:mongoose.Types.ObjectId,ref:'Hubs'}}]
}, {
    collection: 'Users',
})

const User= mongoose.model('Users', UserSchema)

export default User