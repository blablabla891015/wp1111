import Hub from "../models/Hub"
import User from "../models/User";
exports.GetHubData = async (req, res) => {
    const id = req.query.id;
    Hub.findOne({id}).populate('hub_members').exec((err,data)=>{
        if (data){
            res.status(200).send({message: 'success', contents: data});
        }else{
            res.status(403).send({message: 'error', contents: null});
        }
        
    })
}
exports.NewHub = async (req, res) => {
    const body= req.body
    console.log(body)
    Hub.find({},async(err,data)=>{
        let new_id=data.length
        let user=await User.findOne({id:body.id})
        let new_hub=new Hub({id:new_id,hub_name:body.hub_name,hub_members:[user._id],hub_posts:[
            {
                post_user: user.id,//user id                                   
                post_time:2022,
                post_content:'hi everyone',
                comments: [
                ]
            }
        ]})
        // console.log(user)
        user.user_hubs.push(
            {
                accepted:true,
                hub:new_hub._id
            
            }
        )
        await new_hub.save()
        await user.save()
        if(data){
            res.status(200).send({message: 'success', contents: {new_id}});
        }
    })
    
}
exports.HubInvite=async(req,res)=>{
    const body=req.body
    console.log(body)
    let user=await User.findOne({user_name:body.user_name})
    let hub=await Hub.findOne({id:body.hub_id}).populate('hub_members')
    console.log(typeof(body.user_name))
    if(user){
        let isIN=false
    hub.hub_members.map((user)=>{
        if(body.user_name===user.user_name)isIN=true})
        // console.log(isIN)
        if(!isIN){
            user.user_hubs.push({
                accepted:false,
                hub:hub._id
            })
            // hub.hub_members.push(user._id)
            await user.save()
            res.status(200).send({message: 'success', contents: {user_name}});
        }else{
            res.status(200).send({message: 'error', contents: "the User already in this Hub"});
        }

    }else{
        res.status(200).send({message: 'error', contents: 'User not found'});

    }
}
