/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect ,useRef} from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        const priceFilter=state.priceFilter || []
        const mealFilter=state.mealFilter || []
        const typeFilter=state.typeFilter || []
        const sortBy=state.sortBy
        // TODO Part I-3-b: get information of restaurants from DB
        const data=await instance.get('/getSearch',{params: {priceFilter,mealFilter,typeFilter,sortBy}})
        // console.log('data is',data.data.contents)
        setRestaurant(data.data.contents)
    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        console.log(id)
        let d='/restaurant/:'+id.toString()
        // console.log(d)
        navigate(d)
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }
    const getDiscription=(tags)=>{
        // console.log(tags)
        return tags.join(', ')
    }
    return (

        <div className='searchPageContainer'>
            {  
                restaurants.map((item) => {
                    // const ref=useRef(null)
                    return (
                    // TODO Part I-2: search page front-end
                    <div className='resBlock' id={item.id} key={item.id}  onClick={()=>ToRestaurant(item.id)}>
                        <div className='resImgContainer'>
                            <img className='resImg' src={item.img} key={item.id}/>
                        </div>
                        <div className='resInfo' >
                            <div className='title' >
                                <p className='name' >{item.name}</p>
                                <p className='price' >{getPrice(item.price)}</p>
                                <p className='distance' >{item.distance/1000} km</p>
                            </div>
                            <p className='description' >{getDiscription(item.tag)}</p>
                        </div>
                        {/* <p className='description'>{getDiscription(item.tag)}</p> */}
                    </div>
                )})
            }
        </div>
    )
}
export default SearchPage