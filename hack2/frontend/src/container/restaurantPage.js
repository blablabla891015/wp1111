/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [rating,setRating]=useState(0)
    const getInfo = async () => {
        let _id=id.split(':')[1]
        
        const data=await instance.get('/getInfo',{params:{id:_id}})
        console.log(data.data)
        setInfo(data.data.contents[0])

        // let data
    }
    const getComments = async () => {
        let _id=id.split(':')[1]
        const data=await instance.get('/getCommentsByRestaurantId',{params:{restaurantId:_id}})
        console.log(data.data)
        setComments(data.data.contents)
        // setInfo(data.data.contents[0])
        // TODO Part III-3: get a restaurant's comments 
    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
            getComments()
        }
    }, [])
    let n_rating = 0;
    useEffect(() => {
        // setComments(comments)
        for(let i=0;i<comments.length;i++){
            n_rating=n_rating+comments[i].rating
        }
        n_rating=n_rating/comments.length
        setRating(n_rating)
        // console.log(rating)
        // TODO Part III-3-c: update the comment display immediately after submission
    }, [comments])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */
    // let rating = 0;
    // for(let i=0;i<comments.length;i++){

    // }
    
    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage