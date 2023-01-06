import mongoose from 'mongoose'

const Schema = mongoose.Schema

const HubSchema = Schema({
    id:{type:Number,required: true},
    hub_name: { type: String, required: true },
    hub_members:[{type:mongoose.Types.ObjectId,ref:'Users'}],
    hub_posts:[{
        post_user: {type:Number},//user id                                   
        post_time:{type:Number},
        post_content:{type:String},
        comments: [
            {   
                comment_user:{type:Number},//user id
                comment_content:{type:String}
            }
        ]
    }]
}, {
    collection: 'Hubs',
})

const Hub= mongoose.model('Hubs', HubSchema)

export default Hub