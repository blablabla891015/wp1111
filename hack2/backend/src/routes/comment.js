// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    // console.log(id)
    Comment.find({restaurantId:id},(err,data)=>{
        if(err){

        }
        else{
            res.status(200).send({ message: 'success', contents: data })
        }
    })
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body.params
    /****************************************/
    const restaurantId=body.restaurantId
    const name=body.name
    const rating=body.rating
    const content=body.content
    // console.log(body)
    const new_comment=new Comment({restaurantId:restaurantId,name:name,rating:rating,content:content})

    try{
        await new_comment.save()
    }
    catch(e){
        console.log(e)
    }
    res.status(200).send({ message: 'success', contents: new_comment })
    // TODO Part III-3-b: create a new comment to a restaurant
}
