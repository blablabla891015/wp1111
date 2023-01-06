// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get item info from database ]
// * Author       [ Ya Chin Hu ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

// import Info from '../models/info'
import User from '../models/User';
// import Intro from '../models/Intro';
import Music from '../models/Music';
import Opportunity from '../models/Opportunity';

/* tranform data into format of item (dictionary) */
const formatSearchData = (id, type, name, people, tags) => {
    
    name = name.slice(0,20);
    people = (typeof(people) === Array) ? people.slice(0,20) : people.toString().slice(0,20);
    tags = tags.toString().slice(0,20);

    
    let item = {
        id: id,
        type: type,
        name: name,
        people: people,
        tags: tags
    }

    // console.log(item.type,item.name,item.people,item.tags)
    return item
}

exports.GetSearch = async (req, res) => {

    const mode = req.query.mode;
    const searchType = req.query.searchType;
    const filter = req.query.filter;
    const sortMethod = req.query.sortMethod;
    console.log('GetSearch: [searchType, filter, sortMethod] = ',searchType, filter, sortMethod);

    

    /* FOR FRONTEND TESTING */
    // let newMusic = formatSearchData(0,'Music','Music Name',['Music Author1','Music Author2'],['Music Tag1, Music Tag2']);
    // let newArtist = formatSearchData(0,'Artist','Artist Name','Artist Intro: texts will be concated if too long',['Author Tag1', 'Author Tag2']);
    // let newOpp =  formatSearchData(0,'Opporunity','Opportunity Name',['Provider1','Provider2'],['Tag1','Tag2']);

    if(searchType === 'Musics'){
        Music.find({}).populate('creators').exec((err,data)=>{
            if(err){
                res.status(403).send({message: 'error', contents: null});
            }
            if(filter===undefined){
                res.status(200).send({message: 'success', contents: data});
            }
            else{
                let musics=[]
                data.map((music)=>{
                    for(let i =0;i<music.tags.length;i++){
                        if(filter.includes(music.tags[i]))musics.push(music)
                    }
                })
                console.log(musics)
                res.status(200).send({message: 'success', contents: musics});
            }
            // res.status(200).send({message: 'success', contents: data});
        

        })

    }else if(searchType === 'Artists'){
        User.find({}).exec((err,data)=>{
            if(err){
                res.status(403).send({message: 'error', contents: null});
            }
            if(filter===undefined){
                res.status(200).send({message: 'success', contents: data});
            }
            else{
                let users=[]
                data.map((user)=>{
                    for(let i =0;i<user.tags.length;i++){
                        if(filter.includes(user.tags[i]))users.push(user)
                    }
                })
                res.status(200).send({message: 'success', contents: users});
            }

        })

    }else if(searchType === 'Opportunities'){
        Opportunity.find({}).populate('providers').exec((err,data)=>{
            if(err){
                res.status(403).send({message: 'error', contents: null});
            }
            if(filter===undefined){
                res.status(200).send({message: 'success', contents: data});
            }
            else{
                let opps=[]
                data.map((opp)=>{
                    for(let i =0;i<opp.tags.length;i++){
                        if(filter.includes(opp.tags[i]))opps.push(opp)
                    }
                })
                console.log(opps)
                res.status(200).send({message: 'success', contents: opps});
            }

        })

    }else if(searchType === 'All'){
        // items.push(newMusic);
        // items.push(newArtist);
        // items.push(newOpp);

    }else{
        console.log('TYPE DNE!!');
    }
    // console.log(items)
    /* FOR FRONTEND TESTING */
    
    // if(items){
    //     console.log(items)
    //     res.status(200).send({message: 'success', contents: items});
    // }else{
    //     res.status(403).send({message: 'error', contents: null});
    // }
}

exports.GetInfoArtist = async (req, res) => {
    const id = req.query.id;
    User.findOne({id}).populate({path:'musics',populate:{path:'creators'}}).populate('intros').populate({path:'opportunities',populate:{path:'providers'}})
    .populate({path:'user_hubs',populate:{path:'hub',populate:{path:'hub_members'}}}).exec((err,data)=>{
        console.log(data)
        try{let info={
            user_name:data.user_name,
            user_tags:data.tags,
            user_rating:data.rating,
            user_intro:data.intros,
            user_cv:data.user_cv,
            user_musics:data.musics,
            user_contact:data.user_contact,
            user_opportunities:data.opportunities,
            user_hubs:data.user_hubs} 
            res.status(200).send({message: 'success', contents: info});

        } catch(e){
            res.status(403).send({message: 'error', contents: null});

        }
        // if (info){
        //     res.status(200).send({message: 'success', contents: info});
        // }else{
        //     res.status(403).send({message: 'error', contents: null});
        // }
        
    })
}

exports.GetInfoMusic = async (req, res) => {
    console.log(req.query)
    const id = req.query.id;
    Music.findOne({id}).populate('creators').exec((err,data)=>{
        console.log(data)
        let info={
            music_name:data.music_name,
            tags:data.tags.join(' | '),
            rating:data.rating,
            creators:data.creators,
            intro:data.intros
        }
        if (info){
            res.status(200).send({message: 'success', contents: info});
        }else{
            res.status(403).send({message: 'error', contents: null});
        }
        
    })
}
exports.GetInfoOpportunity = async (req, res) => {
    const id = req.query.id;
    Opportunity.findOne({id}).populate('providers').exec((err,data)=>{
        console.log(data)
        let info={
            opportunity_name:data.opportunity_name,
            tags:data.tags.join(' | '),
            rating:data.rating,
            providers:data.providers,
            intro:data.intros
        }
        if (info){
            res.status(200).send({message: 'success', contents: info});
        }else{
            res.status(403).send({message: 'error', contents: null});
        }
        
    })
}