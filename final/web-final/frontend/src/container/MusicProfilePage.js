/****************************************************************************
  FileName      [ ]
  PackageName   [  ]
  Author        [  ]
  Synopsis      [ ]
  Copyright     [  ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import '../css/profilePage.css'
// import Information from './information';
// import Comment from './comment';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import instance from './instance';
import { useUser } from './hooks/useUser';

const MusicProfilePage = () => {
    const { id } = useParams()
    const {state}=useLocation()
    const [info, setInfo] = useState([])
    const navigate=useNavigate()

    // const [comments, setComments] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [rating, setRating] = useState(0)
    
    
    const [user, setUser] = useState(true);             // true if this is the user
    const [editing, setEditing] = useState(false);      // true if in editing mode

    const {user_name}=useUser()

    const getInfo = async () => {
        console.log(id)
        const {
            data: {message, contents},
        } = await instance.get('/getInfoMusic', {
            params: {id} 
        })
        if (message === 'success'){
            console.log(contents)
            setInfo(contents);
        }else{
            console.log('fail to get info');
        }

    }
    const ToArtistProfile = (id) => {
        navigate(('/User/'+id), {
            state: {
                mode: 'profile',
                searchType: 'All',
                filter: null,
                sortMethod: state.sortMethod
            }
        });
    }

    const sendInput = async () => {
        // const input_title = document.getElementById('addInfoTitle').value;
        // const input_subtitle = document.getElementById('addInfoSubtitle').value;
        // const input_content = document.getElementById('addInfoContent').value;

        // // console.log('input_title',input_title);
        // // console.log('input_subtitle',input_subtitle);
        // // console.log('input_content',input_content);

        // const {
        //     data: {message, contents},
        // } = await instance.get('/getInfo', {
        //     params: {input_title, input_subtitle, input_content,id:0} 
        // })
        // // console.log(info)
        // let new_info = info;
        // new_info.intro = [...new_info.intro, {Title:input_title, Subtitle:input_subtitle, Paragraphs:[input_content]}]
        // setInfo(new_info);
        console.log('check')
    }

    useEffect(() => {
        getInfo();
    }, [id])
    
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
                    <div className="profileTag">
                        <p>Creators :</p>
                        {(info.length === 0) ?<div>empty</div>:
                            info.creators.map((user)=>{
                                return <div onClick={()=>{ToArtistProfile(user.id)}}>{user.user_name}</div>
                            })
                        }
                    </div>
                    <h1 className='profileName'>{info.music_name}</h1>
                    <div className='buttonRow'>
                        <div className='button'>like</div>
                        <div className='button'>message</div>
                        <div className='button'>more</div>
                    </div>
                </div>
            </div>
            <div className='profileIntroContainer'>
                {/* {(info.length === 0) ? (<div>hello</div>): (
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
                } */}
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
export default MusicProfilePage