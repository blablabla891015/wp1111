/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import '../css/profilePage.css'
// import Information from './information';
// import Comment from './comment';
import { useParams } from 'react-router-dom'

import instance from './instance';
import { useUser } from './hooks/useUser';

const ProfilePage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(0)
    
    
    const [user, setUser] = useState(true);             // true if this is the user
    const [editing, setEditing] = useState(false);      // true if in editing mode

    const {user_name}=useUser()
    const getInfo = async () => {
        console.log('getInfo in profilePage');
        // setLoading(false);
        const {
            data: {message, contents},
        } = await instance.get('/getInfoArtisit', {
            params: {id} 
        })
        if (message === 'success'){
            setInfo(contents);
        }else{
            console.log('fail to get info');
        }

    }

    const sendInput = async () => {
        const input_title = document.getElementById('addInfoTitle').value;
        const input_subtitle = document.getElementById('addInfoSubtitle').value;
        const input_content = document.getElementById('addInfoContent').value;

        // console.log('input_title',input_title);
        // console.log('input_subtitle',input_subtitle);
        // console.log('input_content',input_content);

        const {
            data: {message, contents},
        } = await instance.get('/getInfo', {
            params: {input_title, input_subtitle, input_content,id:0} 
        })
        // console.log(info)
        let new_info = info;
        new_info.intro = [...new_info.intro, {Title:input_title, Subtitle:input_subtitle, Paragraphs:[input_content]}]
        setInfo(new_info);
    }

    useEffect(() => {
        getInfo();
    }, [id])
    useEffect(() => {
        if(info.name===user_name){
            setUser(true)
        }else{
            setUser(false)

        };
    }, [info])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */
    // let rating = 0;
    
    return (
        <div>
            {editing ? (
                <div className='blockage'>
                    <div className='addInfoModal'>
                        <div className='addInfoTitleContainer'>
                            <p>Tell us more about yourself!</p>
                        </div>
                        <div className='addInfoInputsContainer'>
                            <div className='addInfoInput'>
                                <p>Title</p>
                                <input id='addInfoTitle'/>
                            </div>
                            <div className='addInfoInput'>
                                <p>Subtitle</p>
                                <input id='addInfoSubtitle'/>
                            </div>
                            <div className='addInfoInput'>
                                <p>Content</p>
                                <textarea id="addInfoContent"></textarea>
                            </div>
                        </div>
                        <div className='addInfoBtnRow'>
                            <div className='addInfoBtn' id='addInfoSave' onClick={() => {
                                setEditing(false)
                                sendInput()
                            }}>
                                <p>Save</p>
                            </div>
                            <div className='addInfoBtn' id='addInfoCancel' onClick={() => setEditing(false)}>
                                <p>Cancel</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (null)}

            <div className='titleContainer'>
                <div className="portrait">
                </div>
                <div className="profileTitleBlock">
                    <div className="profileTag">
                        <p>{info.tags}</p>
                    </div>
                    <h1 className='profileName'>{info.name}</h1>
                    <div className='buttonRow'>
                        <div className='button'>like</div>
                        <div className='button'>message</div>
                        <div className='button'>more</div>
                    </div>
                </div>
            </div>
            <div className='profileIntroContainer'>
                {(info.length === 0) ? (<div>hello</div>): (
                    info.intro.map((block) => {
                        return(
                            <div className='profileIntroBlock'>
                                <div className='profileIntroTitle'>
                                    <h1>{block.Title}</h1>
                                    <h2>{block.Subtitle}</h2>
                                </div>
                                <div className='profileIntroText'>
                                {
                                    block.Paragraphs.map((paragraph) => {
                                        return(
                                            <p align='justify'>{paragraph}</p>
                                        );
                                    })
                                }
                                </div>
                            </div>
                        );
                    })
                )
                }
                {user ? (
                    <div className='addNewBlock' onClick={() => setEditing(true)}>
                        <AiOutlinePlus style={{ fontSize: '36px'}}/>
                        <p>ADD INFO</p>
                    </div>
                ) : (null)}
                {/* <div className='addNewBlock' onClick={() => setEditing(true)}>
                        <AiOutlinePlus style={{ fontSize: '36px'}}/>
                        <p>ADD INFO</p>
                </div> */}
            </div>
       </div>
    )
}
export default ProfilePage