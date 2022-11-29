/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        return (
            tags.map((tag)=>(
                <div className='tag' key={tag}>{tag}</div>
            ))
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <div className='tag'>
                {priceText}

            </div>
        )
    }

    const getBusiness = (times) => {
        let days = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']
        let res=[]
        console.log(times)
        for(let i=0;i<days.length;i++){
            if(days[i] in times){
                res.push(<div className='singleDay' key={days[i]}>
                    <div className='day'>{days[i]}</div>
                    <div className='time'>{times[days[i]]}</div>
                </div>)
            }
            else{
                res.push(
                    <div className='singleDay' key={days[i]}>
                    <div className='day'>{days[i]}</div>
                    <div className='time'>Closed</div>
                </div>
                )
            }
    
        }
        if('All' in times){
            res=days.map((day)=>(
                <div className='singleDay' key={day}>
                    <div className='day'>{day}</div>
                    <div className='time'>{times['All']}</div>
                </div>

            ))
        }
        return (
            <div className='businessTime'>
                {res}
                
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information