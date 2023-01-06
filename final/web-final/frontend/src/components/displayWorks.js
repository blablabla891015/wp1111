/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Ya Chin Hu ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'
import OppModal from '../components/oppModal';
import MusicModal from '../container/MusicModal';
// import instance from './instance';

// import axios from 'axios'
// const instance = axios.create({
//     baseURL: 'http://localhost:4000/api'
// })
import instance from '../container/instance'

const DisplayWorks = () => {


    const { state } = useLocation();
    const  [items, setItems] = useState([]);
    const  [searchArtists, setSearchArtists] = useState(null);
    const  [searchMusics, setSearchMusics] = useState(null);
    const  [searchOpps, setSearchOpps] = useState(null);


    const getItems = async () => {
        const mode = state.mode;
        const searchType = state.searchType;
        const filter = state.filter;
        const sortMethod = state.sortMethod;
        console.log(searchType);

        const {
            data: { message, contents},
        } = await instance.get('/getSearch', 
        {params: {
            mode, searchType, filter, sortMethod
        }});
               
        if(message === 'success'){
            console.log("display works search result is",contents)
            if (searchType === 'Artists') {
                setSearchArtists(contents);
                setSearchMusics(null);
                setSearchOpps(null);

            } else if (searchType === 'Musics') {
                setSearchArtists(null);
                setSearchMusics(contents);
                setSearchOpps(null);

            } else if (searchType === 'Opportunities') {
                setSearchArtists(null);
                setSearchMusics(null);
                setSearchOpps(contents);
            }
        }else{
            console.log('display works search return fail');
        }
    }

    useEffect(() => {
        getItems()
    }, [state.searchType, state.filter, state.sortMethod])

    /*** Artist - Navigate ***/
    const navigate = useNavigate();
    const ToArtistProfile = (id) => {
        navigate(('/User/'+id), {
            state: {
                mode: 'profile',
                searchType: 'All',
                filter: null,
                sortMethod: state.sortMethod
            }
        });
        setItems([]);
    }
    /*** Artist - Navigate ***/

    /*** MusicModal ***/
    const [musicModalVisible, setMusicModalVisible] = useState(false);
    const [musicName, setMusicName] = useState(null);
    const [musicTags, setMusicTags] = useState(null);
    const [musicCreators, setMusicCreators] = useState(null);
    const [musicIntros, setMusicIntros] = useState(null);
    const [musicAlbum, setMusicAlbum] = useState(null);
    const [musicYear, setMusicYear] = useState(null);
    const [musicLink, setMusicLink] = useState(null);
    const [music_id,setMusic_Id]=useState(-1)
 
    const handleMusicEdit=(index)=>{
        let music = searchMusics[index];

        setMusic_Id(music.id)
        setMusicAlbum(music.album)
        setMusicCreators(music.creators.map((user) => {return user.user_name}))
        setMusicTags(music.tags)
        setMusicYear(music.year)
        setMusicName(music.music_name)
        setMusicLink(music.link)
        setMusicIntros(music.intros)
        setMusicModalVisible(true)

    }

    const MusicEdit=async()=>{
        if(music_id!== -1){
            const {data:{message,contents}}= await instance.put('MusicEdit',{
                id:music_id,
                album:musicAlbum,
                intros:musicIntros,
                link:musicLink,
                tags:musicTags,
                music_name:musicName,
                year:musicYear
            })
            if(message==='success'){
                setSearchMusics(searchMusics.map((music)=>{
                    if (music.id === music_id)  return contents;
                    else  return music;
                }))   
            }
        }
    }

    useEffect(()=>{
        if(!musicModalVisible) MusicEdit()
    } ,[musicAlbum,musicIntros,musicLink,musicName,musicTags,musicYear,musicModalVisible])
    /*** MusicModal***/


    /*** OppModal ***/
    const [oppName, setOppName] = useState(null);
    const [oppTags, setOppTags] = useState(null);
    const [oppProviders, setOppProviders] = useState(null);
    const [oppIntros, setOppIntros] = useState(null);
    const [oppState, setOppState] = useState(null);
    const [oppModalVisible, setOppModalVisible] = useState(false);
    const [opp_id,setOpp_id] = useState(-1)

    const handleOppEdit=(index)=>{
        let opp=searchOpps[index];

        // set variables for OppModal
        // open OppModal
        setOpp_id(opp.id)
        setOppState(opp.user_opp_state)
        setOppName(opp.user_opp_title)
        setOppTags(opp.tags)
        setOppProviders(opp.providers.map((user)=>{
            return user.user_name
        }))
        setOppIntros(opp.user_opp_info)
        setOppModalVisible(true)
    }

    // edit OppModal model at backend
    const OppEdit = async () => {
        if(opp_id!== -1){
            const {data:{message,contents}}= await instance.put('OppEdit',{
                id:opp_id,
                user_opp_state:oppState,
                user_opp_title:oppName,
                tags:oppTags,
            })
            if(message==='success'){
                setSearchOpps(searchOpps.map((opp)=>{
                    if(opp.id===opp_id){
                        console.log(contents)
                        return contents
                    }else{
                        return opp
                    }
                }))
            }
        }
    }

    useEffect(()=>{
        if(!oppModalVisible)    OppEdit()
    } ,[oppName,oppIntros,oppState,oppTags,oppModalVisible])
    /*** OppModal ***/

    const processClick = (id) => {
        console.log(id);
        if (state.searchType === "Artists") {
            // alert('artist')
            ToArtistProfile(id);

        } else if (state.searchType === "Musics") {
            // alert('music')
            handleMusicEdit(id);

        } else if (state.searchType === "Opportunities") {
            // alert('opporunities')
            handleOppEdit(id);

        }
    }
    

    const extractUserName = (user_list) => {
        if (user_list === null) return null;

        let output_text = user_list[0].user_name;
        for (let i=1; i<user_list.length; i++) {
            output_text += (', '+user_list[i].user_name);
        }
        return output_text;
    }

    const listToText = (list) => {
        if (list === null) return null;
        let output_text = list[0];
        for (let i=1; i<list.length; i++) {
            output_text += (', '+list[1]);
        }
        return output_text;
    }

    return (

        <div className='displayContainer'>

            <OppModal oppModalVisible={oppModalVisible} setOppModalVisible={setOppModalVisible}
            oppName={oppName} setOppName={setOppName}
            oppIntros={oppIntros} setOppIntros={setOppIntros}
            oppState={oppState} setOppState={setOppState}
            oppTags={oppTags} setOppTags={setOppTags}
            oppProviders={oppProviders} setOppProviders={setOppProviders}
            oppEditable={false}
            />

            <MusicModal musicModalVisible={musicModalVisible} setMusicModalVisible={setMusicModalVisible}
            musicAlbum={musicAlbum} setMusicAlbum={setMusicAlbum}
            musicCreators={musicCreators} setMusicCreators={setMusicCreators}
            musicIntros={musicIntros} setMusicIntros={setMusicIntros}
            musicLink={musicLink} setMusicLink={setMusicLink}
            musicTags={musicTags} setMusicTags={setMusicTags}
            musicYear={musicYear} setMusicYear={setMusicYear}
            musicName={musicName} setMusicName={setMusicName}
            musicEditable={false}
            />

            {
                (state.searchType === 'Opportunities' && searchOpps !== null) ?
                (
                    searchOpps.map((opp) => {
                        return(
                            <div className='profileContainer' id={opp.id} onClick={() => processClick(opp.id)}>
                                <div className='imgContainer'></div>
                                <div className='searchTitleContainer'>
                                        <p className="titleA">{opp.user_opp_title}</p>
                                        <p className='titleB'>{extractUserName(opp.providers)}</p>
                                </div>
                                <div className='searchTagContainer'>
                                        <p>{listToText(opp.tags)}</p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                (state.searchType === 'Musics' && searchMusics !== null) ? 
                (
                    searchMusics.map((music) => {
                        return(
                            <div className='profileContainer' id={music.id} onClick={() => processClick(music.id)}>
                                <div className='imgContainer'></div>
                                <div className='searchTitleContainer'>
                                        <p className="titleA">{music.music_name}</p>
                                        <p className='titleB'>{extractUserName(music.creators)}</p>
                                </div>
                                <div className='searchTagContainer'>
                                        <p>{listToText(music.tags)}</p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                (state.searchType === 'Artists' && searchArtists !== null) ? 
                (
                    searchArtists.map((artist) => {
                        return(
                            <div className='profileContainer' id={artist.id} onClick={() => processClick(artist.id)}>
                                <div className='imgContainer'></div>
                                <div className='searchTitleContainer'>
                                        <p className="titleA">{artist.user_name}</p>
                                </div>
                                <div className='searchTagContainer'>
                                        <p>{listToText(artist.tags)}</p>
                                </div>
                            </div>
                        )
                    })
                ) : null ))
            }
            {
            //     items.map(({id, type, name, people, tags}) => {
            //     return(
            //         <div className='profileContainer' id={id} onClick={() => processClick(id)}>
            //            <div className='imgContainer'></div>
            //            <div className='searchTitleContainer'>
            //                 <p className="titleA">{name}</p>
            //                 <p className='titleB'>{people}</p>
            //            </div>
            //            <div className='searchTagContainer'>
            //                 <p>{tags}</p>
            //            </div>
            //         </div>
            //     );
            // })
            }
            <div className='profileContainer'></div>
            <div className='profileContainer'></div>
            <div className='profileContainer'></div>
            <div className='profileContainer'></div>
            <div className='profileContainer'></div>
        </div>
    )
}
export default DisplayWorks
