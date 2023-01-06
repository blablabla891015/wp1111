import mongoose from 'mongoose'

const Schema = mongoose.Schema

const OpportunitySchema = Schema({
    id:{type:Number,required: true},
    user_opp_title: { type: String, required: true },
    rating:{type:Number},
    tags:[{type:String}],
    providers:[{type:mongoose.Types.ObjectId,ref:'Users'}],
    user_opp_info:{type:String,required: true },
    user_opp_state:{type:Boolean,required: true },

}, {
    collection: 'Opportunities',
})

const Opportunity= mongoose.model('Opportunities', OpportunitySchema)

export default Opportunity