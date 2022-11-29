// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'
import mongoose from 'mongoose'
// const db = mongoose.connection
const getPrice = (price) => {
    let priceText = ""
    for (let i = 0; i < price; i++)
        priceText += "$"
    return (priceText)
}
exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/
    // console.log(req.query)
    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    const compare_d=(a,b)=>{
        if(a.distance>b.distance){
            return 1
        }
        else if((a.distance<b.distance)){
            return -1
        }
        else{
            return 0
        }
    }
    const compare_p=(a,b)=>{
        if(a.price>b.price){
            return 1
        }
        else if((a.price<b.price)){
            return -1
        }
        else{
            return 0
        }
    }
    Info.find({},(err, data)=>{
        if(err){
            res.status(403).send({ message: 'error', contents: 'get search error error'})
        }
        else{
            let abcd=[]
            // let add_p=false
            // let add_m=false
            // let add_t=false
            for(let i=0;i<data.length;i++){
                // console.log(data[i])
                let add_p=false
                let add_m=false
                let add_t=false
                if(mealFilter !== undefined){
                    for(let j=0;j<data[i].tag.length;j++){
                        if(mealFilter.includes(data[i].tag[j])){
                            add_m=true
                        }
                    }
                }
                else{
                    // console.log(undefined,"m")
                    add_m=true
                }

                if(typeFilter !== undefined){
                    for(let j=0;j<data[i].tag.length;j++){
                        if(typeFilter.includes(data[i].tag[j])){
                            add_t=true
                        }
                    }
                }
                else{
                    // console.log(undefined,"t")
                    add_t=true
                }

                if(priceFilter !== undefined){
                    if(priceFilter.includes(getPrice(data[i].price))){

                        // console.log(getPrice(data[i].price))
                        add_p=true
                    }
                }
                else{
                    // console.log(undefined,"p")
                    add_p=true

                }
                // console.log(add_p,add_m,add_t)
                // console.log(data[i].tag,data[i].price)
                if(priceFilter===undefined && mealFilter===undefined && typeFilter===undefined){
                    // console.log('check')
                    add_p=true
                    add_m=true
                    add_t=true
                }
                if(add_p && add_m && add_t){
                    abcd.push(data[i])
                }

            }
            console.log(sortBy)
            console.log(abcd.length)
            if(sortBy==='price'){
                abcd.sort(compare_p)
            }
            else{
                abcd.sort(compare_d)
            }
            res.status(200).send({ message: 'success', contents: abcd })
        }
    })

    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    

    // TODO Part I-3-a: find the information to all restaurants
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    Info.find({id:id},(err,data)=>{
        if(err){

        }
        else{
            res.status(200).send({ message: 'success', contents: data })
        }

    })
    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}