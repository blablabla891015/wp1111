import User from "../models/User";
import Hub from "../models/Hub";
import Music from "../models/Music";
import Opportunity from "../models/Opportunity";
exports.UpdateUserData = async (req, res) => {
    const id = req.body.id;
    // console.log(req.body.tags)
    let user=await User.findOneAndUpdate({id},{
        tags:req.body.tags,
        user_contact:req.body.user_contact,
        user_cv:req.body.user_cv,
        intros:req.body.intros
    },{new: true})
    console.log(user.tags)
    console.log(user.intros)

}
exports.UpdateHubData = async (req, res) => {
    const id = req.body.id;
    await Hub.findOneAndUpdate({id},{
        hub_posts:req.body.hub_posts,
        hub_name:req.body.hub_name


    })

}
exports.acceptInvitation = async (req, res) => {
    const user_id = req.body.user_id;
    const hub_id = req.body.hub_id
    let user=await User.findOne({id:user_id}).populate({path:'user_hubs',populate:{path:'hub',populate:{path:'hub_members'}}})
    let hub=await Hub.findOne({id:hub_id})
    // console.log(user.user_hubs)
    // console.log(user.user_name)
    // console.log(hub.hub_members)

    hub.hub_members.push(user._id)
    for(let i=0;i<user.user_hubs.length;i++){
        if(user.user_hubs[i].hub.id===hub_id){
            console.log('check')
            user.user_hubs[i].accepted=true
        }

    }
    await user.save()
    await hub.save()
    // await Hub.findOneAndUpdate({id},{
    //     hub_posts:req.body.hub_posts,
    //     hub_name:req.body.hub_name


    // })

}
exports.MusicEdit = async (req, res) => {
    const music_id=req.body.id
    console.log(req.body)
    let music=await Music.findOneAndUpdate({id:music_id},{
        music_name:req.body.music_name,
        album:req.body.album,
        year:req.body.year,
        intros:req.body.intros,
        tags:req.body.tags,
        link:req.body.link,
        
    },{new: true}).populate('creators')
    if(music){
        res.status(200).send({message: 'success', contents: music});
    }


}
exports.OppEdit = async (req, res) => {
    const opp_id=req.body.id
    console.log(req.body)
    let opp=await Opportunity.findOneAndUpdate({id:opp_id},{
        user_opp_state:req.body.user_opp_state,
        user_opp_title:req.body.user_opp_title,
        user_opp_info:req.body.user_opp_info,
        tags:req.body.tags,
        
    },{new: true}).populate('providers')
    // console.log(opp)
    if(opp){
        res.status(200).send({message: 'success', contents: opp});
    }


}
exports.NewMusic =async(req,res)=>{
    const id=req.body.id
    Music.find({},async(err,musics)=>{
        // console.log()
        let new_id=musics.length
        console.log(new_id)
        let user=await User.findOne({id:id})
        let new_music=new Music({id:new_id,music_name:'new',tags:['new'],intros:['new'],
        year:2022,album:'new',link:"new",creators:[user._id]})
        user.musics.push(new_music._id)

        await user.save()
        await new_music.save()
        if(new_music){
            res.status(200).send({message: 'success', contents: new_music});

        }

    })
}
exports.NewOpp =async(req,res)=>{
    const id=req.body.id
    Opportunity.find({},async(err,opps)=>{
        // console.log()
        let new_id=opps.length
        console.log('opp id is',opps)
        let user=await User.findOne({id:id})
        let new_opp=new Opportunity({id:new_id,user_opp_title:'new',tags:['new'],user_opp_state:true,providers:[user._id]
    ,user_opp_info:'new'})
        user.opportunities.push(new_opp._id)

        await user.save()
        await new_opp.save()
        if(new_opp){
            res.status(200).send({message: 'success', contents: new_opp});

        }

    })
}
exports.DeleteMusic=async(req,res)=>{
    const user_id=req.body.user_id
    const music_id=req.body.music_id
    let d_music=await Music.deleteOne({id:music_id})
    let user=await User.findOne({id:user_id})
    user.musics.pop(d_music._id)
    await user.save()
    if(user){
        res.status(200).send({message: 'success', contents: {}})
    }
}
exports.DeleteOpp=async(req,res)=>{
    const user_id=req.body.user_id
    const opp_id=req.body.music_id
    let d_opp=await Opportunity.deleteOne({id:opp_id})
    let user=await User.findOne({id:user_id})
    user.opportunities.pop(d_opp._id)
    await user.save()
    if(user){
        res.status(200).send({message: 'success', contents: {}})
    }
}