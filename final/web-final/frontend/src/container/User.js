import '../css/me.css'
import '../css/markdown.css'
import { useRef, useState, useEffect, React, useId } from 'react';
import { useUser } from '../container/hooks/useUser';
import instance from './instance';
import { Row } from 'antd';
import { useParams ,useNavigate} from 'react-router-dom'
import MusicModal from './MusicModal';
import OppModal from '../components/oppModal';
import markdownToHtml from '../util/markdown'

const User = () => {
    const { id } = useParams()
    const {login, username,userId} = useUser();
    const [prevSwap, setPrevSwap] = useState(null);
    const [editing,setEditing]=useState(false)
    const [isUser,setIsUser] =useState()
    const navigate=useNavigate()
    // useEffect(()=>{
    //     if(!login)navigate('/')
    // },[login])
    //////////Music Update
    const [musicModalVisible, setMusicModalVisible] = useState(false);
    const [musicName, setMusicName] = useState(null);
    const [musicTags, setMusicTags] = useState(null);
    const [musicCreators, setMusicCreators] = useState(null);
    const [musicIntros, setMusicIntros] = useState(null);
    const [musicAlbum, setMusicAlbum] = useState(null);
    const [musicYear, setMusicYear] = useState(null);
    const [musicLink, setMusicLink] = useState(null);
    // const [musicEditable,setMusicEditable] = useState(true)
    const [music_id,setMusic_Id]=useState(-1)
    // const { id } = useParams()
    // const [info, setInfo] = useState([])
    const handleMusicedit=(index)=>{
        let music=userMusic[index]
        console.log(music)
        setMusic_Id(music.id)
        setMusicAlbum(music.album)
        setMusicCreators(music.creators.map((user)=>{
            return user.user_name
        }))
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
                setUserMusic(userMusic.map((music)=>{
                    if(music!==null){
                        if(music.id===music_id){
                            return contents
                        }
                        else{
                            return music
                        }

                    }else{
                        return music
                    }
                }))
                
            }

        }
        

    }
    useEffect(()=>{
        if(!musicModalVisible){
            MusicEdit()
        }


        
    }
    ,[musicAlbum,musicIntros,musicLink,musicName,musicTags,musicYear,musicModalVisible])
    ////////Music Update

    //////Opp update
    const [oppName, setOppName] = useState(null);
    const [oppTags, setOppTags] = useState(null);
    const [oppProviders, setOppProviders] = useState(null);
    const [oppIntros, setOppIntros] = useState(null);
    const [oppState, setOppState] = useState(null);
    const [oppModalVisible, setOppModalVisible] = useState(false);
    const [opp_id,setOpp_id]=useState(-1)
    const handleOppEdit=(index)=>{
        let opp=userOpp[index]
        // setOppIntros
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
    const OppEdit=async()=>{
        if(opp_id!== -1){
            const {data:{message,contents}}= await instance.put('OppEdit',{
                id:opp_id,
                user_opp_state:oppState,
                user_opp_title:oppName,
                user_opp_info:oppIntros,
                tags:oppTags,
            })
            if(message==='success'){
                setUserOpp(userOpp.map((opp)=>{
                    if(opp!==null){
                        if(opp.id===opp_id){
                            // console.log(contents)
                            return contents
                        }else{
                            return opp
                        }
                    }else{
                        return opp
                    }
                }))
            }
        }
        

    }
    useEffect(()=>{
        if(!oppModalVisible){
            console.log('opp is',userOpp)
            OppEdit()
        }
        
    }
    ,[oppName,oppIntros,oppState,oppTags,oppModalVisible])



    ///////////////////////////////////opp update


    useEffect(() => {
        window.onbeforeunload = function() {
            return true;
        };
    
        return () => {
            // functions to run when reload
            // if(userIntro !== null){
            //     for(let i=0; i<userIntro.length; i++){
            //         textAreaResize('me_intro_title_input_'+i);
            //         console.log(i);
            //     }   
            // }
            // window.onbeforeunload = null;
        };
    }, []);

    /***** REQUIRED DATA *****/
    let user_name = "Coldplay";
    let user_rating = 5.0;
    let user_tags = ['British, 1971'];
    let user_intro = [
         'Coldplay: The World Icon of Pop Music',
    ];
    let user_cv = [
        {
            user_cv_time: "1999-2001",
            user_cv_event: "Parachutes Tour",
            user_cv_note: 
            "Following their first ever performance at The Laurel Tree as Starfish, Coldplay embarked\
            on a string of concerts between 1998 and 1999 which include their Glastonbury Festival\
            debut. Coldplay visited small venues and festivals across Eurpo, North America and Oceania,\
            while one-off shows in Japan and Singapore were held as well."
        }
    ];
    let user_music = [
        {
            user_music_title: "Fix You",
            user_music_album: "X&Y",
            user_music_year: 2005,
            user_music_link: "https://www.youtube.com/watch?v=k4V3Mo61fJM",
        }
    ]
    let user_opp = [
        {   
            user_opp_state: true,
            user_opp_title: "Music Producer",
            user_opp_info: 
                "Work Closely with Marketing and PR departments to streamline\
                the production and promotion of 15+ monthly record releases."
        }
    ]
    let user_contact = {
        user_contact_email: "coldplay@coldplay.com",
        user_contact_phone: "+442071838750",
        user_contact_address: "somewhere",
        user_contact_links:{
            ig_link: "https://www.instagram.com/coldplay/?hl=en",
            yt_link: "https://www.youtube.com/channel/UCDPM_n1atn2ijUwHd0NNRQw",
            tw_link: null,
            fb_link: null,
        }
    }
    /***** REQUIRED DATA END *****/

    /***** COMMUNICATING FUNCTIONS *****/
    const [userName, setUserName] = useState(user_name);
    const [userRating, setUserRating] = useState();
    const [userTags, setUserTags] = useState(user_tags);
    const [userIntro, setUserIntro] = useState(user_intro);
    const [userCv, setUserCv] = useState(user_cv);
    const [userMusic, setUserMusic] = useState(user_music);
    const [userOpp, setUserOpp] = useState(user_opp);
    const [userContact, setUserContact] = useState(user_contact);

    const adjustTags = (tag_arr) => {

        if (tag_arr === null || tag_arr.length === 0) {
            setUserTags([username, username, username, username, username, username]);

        } else if (tag_arr.length === 1 && tag_arr[0] !== ''){
            setUserTags([tag_arr[0],tag_arr[0],tag_arr[0],tag_arr[0],tag_arr[0],tag_arr[0]]);
        
        } else if (tag_arr.length === 2){
            setUserTags([tag_arr[0],tag_arr[1],tag_arr[0],tag_arr[1],tag_arr[0],tag_arr[1]]);

        } else if (tag_arr.length === 3){
            setUserTags([tag_arr[0],tag_arr[1],tag_arr[2],tag_arr[0],tag_arr[1],tag_arr[2]]);

        } else if (tag_arr.length === 4){
            setUserTags([tag_arr[0],tag_arr[1],tag_arr[2],tag_arr[3],tag_arr[0],tag_arr[1]]);

        } else if (tag_arr.length === 5){
            setUserTags([tag_arr[0],tag_arr[1],tag_arr[2],tag_arr[3],tag_arr[4],tag_arr[0]]);
        
        } else if (tag_arr.length >= 6){
            setUserTags([tag_arr[0],tag_arr[1],tag_arr[2],tag_arr[3],tag_arr[4],tag_arr[5]]);
        
        } else {
            console.log('abnorm!',tag_arr);
            setUserTags([username, username, username, username, username, username]);
        }
    }

    // useEffect(() => {
    //     adjustTags()
    // },[userName])

    const getInfo = async () => {
        // console.log(data)
        const {
            data: {message, contents},
        } = await instance.get('/getInfoArtisit', {
            params: {id} 
        })
        // console.log(contents)
        if (message === 'success'){
            // console.log(contents)
            // setInfo(contents);
            setUserName(contents.user_name)
            // setUserTags(contents.user_tags)
            setUserMusic(contents.user_musics)
            setUserCv(contents.user_cv)
            setUserIntro(contents.user_intro)
            setUserContact(contents.user_contact)
            // console.log('USERTAGS',contents.user_tags);
            adjustTags(contents.user_tags)
            // console.log('USERNAME',contents.user_name)
            setUserOpp([...contents.user_opportunities,null])
        }else{
            console.log('fail to get info');
        }

    }
    useEffect(() => {
        getInfo();
        // console.log(userId)
        if(userId.toString()===id){
            setIsUser(true)
        }
        else{
            setIsUser(false)
        }
    }, [id, userId])
    //////fix the bug that textarea didn't update with states
    useEffect(
        ()=>{
            document.getElementById('me_slide_input').value=userTags.join('|')
        }
    ,[userTags])
    useEffect(
        ()=>{
            userCv.map((content,index)=>{
                document.getElementById("me_cv_item_time_input_"+index).value=content.user_cv_time
                document.getElementById("me_cv_item_event_input_"+index).value=content.user_cv_event
                document.getElementById("me_cv_item_note_input_"+index).value=content.user_cv_note
            })
        }
    ,[userCv])
    useEffect(
        ()=>{
            userIntro.map((content,index)=>{
                document.getElementById("me_intro_title_input_"+index).value=content
            })
        }
    ,[userIntro])


    ////// update user profile
    const updateData=async()=>{
        console.log(userCv)
        const {
            data: {message, contents},
        } = await instance.put('/getUpdataArtist', {
                id:id,
                intros:userIntro,
                user_cv:userCv,
                user_contact:userContact,
                tags:userTags
            })

    }
    useEffect(()=>{
        if(editing){
            updateData()
            setEditing(false)

        }
        // updateData()


    },[userCv,userContact,userIntro,userTags])
   

    const deleteMusic=async(index,id)=>{
        const {data:{message,contents}}=await instance.put('DeleteMusic',{
            music_id:id,
            user_id:userId
        })
        if(message==='success'){
            setUserMusic([
                ...userMusic.slice(0,index),...userMusic.slice(index+1,userMusic.length)
            ])
        }

    }
    const deleteOpp=async(index,id)=>{
        const {data:{message,contents}}=await instance.put('DeleteOpp',{
            opp_id:id,
            user_id:userId
        })
        if(message==='success'){
            setUserOpp([
                ...userOpp.slice(0,index),...userOpp.slice(index+1,userOpp.length)
            ])
        }

    }
    const textAreaResize = (id) => {
        
        // console.log('text area resize');
        const textarea = document.getElementById(id);
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

    };
    
    const equate = (list1, list2) => {
        if (list1.length !== list2.length)  return false;
        for (let i=0; i<list1.length; i++){
            if (list1[i] !== list2[i])  return false;
        }
        return true;
    };

    const hideShow = (hide_id_list, show_id_list) => {
        for (let i=0; i<hide_id_list.length; i++){
            let hide_element = document.getElementById(hide_id_list[i]);
            
            hide_element.classList.add('hidden');
            // console.log(hide_element.classNameList)
        };

        for (let j=0; j<show_id_list.length; j++){
            let show_element = document.getElementById(show_id_list[j]);
            show_element.classList.remove('hidden');
        };
    };

    // 'id' stands for array index or subtype
    const swap = (display_id_list, input_id_list, type, id=null) => {
        console.log('input list is',display_id_list)
        setEditing(true)
        let hide_id_list = display_id_list; 
        let show_id_list = input_id_list;

        // for(let i=0; i<input_id_list; i++){
        //     textAreaResize(input_id_list[i])
        // }

        // console.log(userTags)
        // from display to input, prev clear
        if (prevSwap === null) {
            setPrevSwap({hide_id_list:hide_id_list, show_id_list:show_id_list});

        // from input to display
        } else if (equate(prevSwap.hide_id_list,display_id_list) &&
        equate(prevSwap.show_id_list,input_id_list)) {
            hide_id_list = input_id_list;
            show_id_list = display_id_list;
            setPrevSwap(null);
            // console.log(userTags)
            editToState(input_id_list, type, id);

        // from display to input, prev not yet dealt with
        } else {
            hideShow(prevSwap.show_id_list,prevSwap.hide_id_list);
            setPrevSwap({hide_id_list:hide_id_list, show_id_list:show_id_list});
        }

        hideShow(hide_id_list, show_id_list);
    };

    // change states on ADD
    // const addToState = async (type) => {
    const addToState = async(type) => {
        setEditing(true)
        if (type === 'intro'){
            console.log(userIntro)
            setUserIntro([
                ...(userIntro),
                'new'
            ])
            // await newIntro();
        } else if (type === 'cv') {
            setUserCv([
                ...(userCv.slice(0,userCv.length)),
                {
                    user_cv_time: "20xx-20xx",
                    user_cv_event: "event",
                    user_cv_note: "Description section. Tell us more about your adventure."
                }
            ])
            // await newCVItem();
        } else if (type === 'opp') {
            const {data:{message,contents}}=await instance.post('NewOpp',{
                id:userId
            })
            if(message==="success"){
                setUserOpp([
                    ...(userOpp.slice(0,userOpp.length-1)),
                    contents,null
                ])

            }
            // await newOpp();
        } else if (type === 'music') {
            const {data:{message,contents}}=await instance.post(
                'NewMusic',{id:userId}
            )
            if(message==='success'){
                setUserMusic([
                    ...(userMusic),
                    contents
                ])
            }
            // await newMusic(); 
        }
    }

    // change states on DELETE
    // const deleteToState = async (type, id) => {
    const deleteToState = (type, id) => {
        setEditing(true)

        if (type === 'intro') {
            setUserIntro([
                ...(userIntro.filter((item,index) => (index !== id))),

            ])
            // await deleteIntro(id);
        } else if (type === 'cv') {
            setUserCv([
                ...(userCv.filter((item,index) => (index !== id))),

            ])
            // await deleteCVItem(id);
        }
    }


    //  change states on EDIT
    // const editToState = await (input_id_list, type, id) => {
    const editToState = (input_id_list, type, id) => {
        // console.log(input_id_list)
        console.log(userCv)
        if (type === 'tags') {
            const tags_content = document.getElementById(input_id_list[0]).value;
            // console.log(tags_content)
            const tag_arr = tags_content.split('|',6);
            adjustTags(tag_arr);
            console.log(userTags);
            // await updateTag()
        } else if (type === 'intro') {
            const intro_title = document.getElementById(input_id_list[0]).value;
            // const intro_p = document.getElementById(input_id_list[1]).value;
            
            if (id === 0) {
                if (userIntro.length === 1){
                    setUserIntro([intro_title])
                } else {
                    setUserIntro([
                        intro_title,
                        ...(userIntro.slice(1, userIntro.length))
                    ]);
                }
            } else {
                setUserIntro([
                    ...(userIntro.slice(0,id)),
                    intro_title,
                    ...(userIntro.slice(id+1, userIntro.length))
                ])
            }
            // await updateIntro(id, intro_title, intro_p);
        } else if (type === 'cv') {
            const cv_time = document.getElementById(input_id_list[0]).value;
            const cv_event = document.getElementById(input_id_list[1]).value;
            const cv_note = document.getElementById(input_id_list[2]).value;

            if (id === 0) {
                setUserCv([
                    {
                        user_cv_time: cv_time,
                        user_cv_event: cv_event,
                        user_cv_note: cv_note,
                    },
                    ...(userCv.slice(1, userCv.length))
                ])
            } else {
                setUserCv([
                    ...(userCv.slice(0,id)),
                    {user_cv_time: cv_time,
                    user_cv_event: cv_event,
                    user_cv_note: cv_note,},
                    ...(userCv.slice(id+1, userCv.length))
                ])
            }
            // await updateCVItem(id, cv_time, cv_event, cv_note);
        } else if (type === 'opp') {
            const opp_title = document.getElementById(input_id_list[0]).value;
            const opp_info = document.getElementById(input_id_list[1]).value;

            if (id === 0) {
                setUserOpp([
                    {
                        user_opp_state: userOpp[id].user_opp_state,
                        user_opp_title: opp_title,
                        user_opp_info: opp_info,
                    },
                    ...(userOpp.slice(1, userOpp.length))
                ])
            } else {
                setUserOpp([
                    ...(userOpp.slice(0,id)),
                    {
                    user_opp_state: userOpp[id].user_opp_state,
                    user_opp_title: opp_title,
                    user_opp_info: opp_info,},
                    ...(userOpp.slice(id+1, userOpp.length))
                ])
            }
            // await updateOpp(id, userOpp[id].user_opp_state, opp_title, opp_info);
        } else if (type === 'contact') {
            if (id === "email") {
                const contact_email = document.getElementById(input_id_list[0]).value;
                setUserContact({
                    user_contact_email: contact_email,
                    user_contact_phone: userContact.user_contact_phone,
                    user_contact_address: userContact.user_contact_address,
                    user_contact_links: userContact.user_contact_links,
                });

            } else if (id === "phone") {
                const contact_phone = document.getElementById(input_id_list[0]).value;
                setUserContact({
                    user_contact_email: userContact.user_contact_email,
                    user_contact_phone: contact_phone,
                    user_contact_address: userContact.user_contact_address,
                    user_contact_links: userContact.user_contact_links,
                });

            } else if (id === "address") {
                const contact_address = document.getElementById(input_id_list[0]).value;
                setUserContact({
                    user_contact_email: userContact.user_contact_email,
                    user_contact_phone: userContact.user_contact_phone,
                    user_contact_address: contact_address,
                    user_contact_links: userContact.user_contact_links,
                });

            } else if (id === "links") {
                const contact_links_raw = document.getElementById(input_id_list[0]).value;
                const contact_links = textToLinks(contact_links_raw);

                if (contact_links !== null) 
                setUserContact({
                    user_contact_email: userContact.user_contact_email,
                    user_contact_phone: userContact.user_contact_phone,
                    user_contact_address: userContact.user_contact_address,
                    user_contact_links: {
                        "ig_link": contact_links[0],
                        'yt_link': contact_links[1],
                        'tw_link': contact_links[2],
                        'fb_link': contact_links[3]
                    }
                });
            } 
            // await updateContact(user_contact);
        } else {
            console.log('error: ',type, id);
        }
    };

    const toggleState = (state, id) => {
        setEditing(true)
        setUserOpp([
            ...(userOpp.slice(0,id)),
            {
            user_opp_state: !state,
            user_opp_title: userOpp[id].user_opp_title,
            user_opp_info: userOpp[id].user_opp_info,},
            ...(userOpp.slice(id+1, userOpp.length))
        ]);
    };
    
    const textToLinks = (text) => {
        console.log(text);
        let link_arr = text.split('\n');
        if (link_arr.length !== 4)  return null;

        if ((link_arr[0].slice(0,'Instagram('.length)) !== 'Instagram(' || link_arr[0][-1] !== ')'){
            return null;
        } else {
            link_arr[0] = link_arr[0].slice(('Instagram('.length)-1 , link_arr[0].length);
        }
        if ((link_arr[1].slice(0,'Youtube('.length)) !== 'Youtube(' || link_arr[1][-1] !== ')'){
            return null;
        } else {
            link_arr[1] = link_arr[1].slice(('Youtube('.length)-1 , link_arr[1].length);
        }
        if ((link_arr[2].slice(0,'Twitter('.length)) !== 'Twitter(' || link_arr[2][-1] !== ')'){
            return null;
        } else {
            link_arr[2] = link_arr[2].slice(('Twitter('.length)-1 , link_arr[2].length);
        }
        if ((link_arr[3].slice(0,'Facebook('.length)) !== 'Facebook(' || link_arr[3][-1] !== ')'){
            return null;
        } else {
            link_arr[3] = link_arr[3].slice(('Facebook('.length)-1 , link_arr[3].length);
        }

        for (let i=0; i<link_arr.length; i++) {
            if (link_arr === 'null'){
                link_arr = null;
            }
        }
        return link_arr;
    }

    const linksToText = () => {
        const link_list = userContact.user_contact_links;
        return(
            "Instagram(" + link_list.ig_link + ")\n" +
            "Youtube("   + link_list.yt_link + ")\n" +
            "Twitter("   + link_list.tw_link + ")\n" +
            "Facebook("  + link_list.fb_link + ") "
        );
    };

    /*** User Tags Feature***/
    const static_user_tags = ['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday','Retro','Lounge',
    'Blues','Soul &RnB','Funk', 'Latin','Country','Acoustic','Indie','Rap','Classical','Heavy Metal',
    'Synth','Drums','Percussion','Guitar','Bass','KeyBoard','Vocals','Piano', 
    'String','Woodwinds','Brass','Saxophone','Harmonica','BeatBox']

    const [tagAddSectionOn, setTagAddSectionOn] = useState(false);
    const [tempUserTags, setTempUserTags] = useState([]);
    const [potentialUserTags, setPotentialUserTags] = useState(static_user_tags);
    
    const removeDuplicates = (list) => {
        let output_list = [];
        for (let i=0; i<list.length; i++){
            if (!output_list.includes(list[i]) && list[i] !== userName) output_list.push(list[i]);
        }
        console.log('remove duplicates:',output_list);
        return output_list;
    }
    useEffect(() =>{
        adjustTags(tempUserTags);
    },[tempUserTags])
    const removeTag = (index) => {
        // console.log('before remove tag',tempUserTags);
        const processed_tag = tempUserTags[index];
        setTempUserTags([
            ...(tempUserTags.slice(0,index)),
            ...(tempUserTags.slice(index+1,tempUserTags.length)),
        ]);
        setPotentialUserTags([
            ...(potentialUserTags),
            processed_tag,
        ]);
        // console.log('after remove tag',tempUserTags);
        // adjustTags(tempUserTags);
    }

    const addTag = (index) => {
        const processed_tag = potentialUserTags[index];
        // console.log('before add tag',tempUserTags);
        setTempUserTags([
            processed_tag,
            ...(tempUserTags),     
        ].slice(0,6)); 
        setPotentialUserTags([
            ...(potentialUserTags.slice(0,index)),
            ...(potentialUserTags.slice(index+1,potentialUserTags.length)),
        ])
        // console.log('after add tag',tempUserTags);
        // adjustTags(tempUserTags);
    }
    /*** User Tags Feature***/
 
    const meIndex = (
        <div className="me_part_index">
            <p id="me_items_title">Index</p>
            <div className="me_items_container">
                <div className="me_item">
                    <div className="me_item_linemark"></div>
                    <p>Intro</p>
                </div>
                <div className="me_item">
                    <div className="me_item_linemark"></div>
                    <p>CV</p>
                </div>
                <div className="me_item">
                    <div className="me_item_linemark"></div>
                    <p>Musics</p>
                </div>
                <div className="me_item">
                    <div className="me_item_linemark"></div>
                    <p>Contact</p>
                </div>
            </div>
        </div>
    );

    return(
        <div className="user me">
            <MusicModal musicModalVisible={musicModalVisible} setMusicModalVisible={setMusicModalVisible}
            musicAlbum={musicAlbum} setMusicAlbum={setMusicAlbum}
            musicCreators={musicCreators} setMusicCreators={setMusicCreators}
            musicIntros={musicIntros} setMusicIntros={setMusicIntros}
            musicLink={musicLink} setMusicLink={setMusicLink}
            musicTags={musicTags} setMusicTags={setMusicTags}
            musicYear={musicYear} setMusicYear={setMusicYear}
            musicName={musicName} setMusicName={setMusicName}
            musicEditable={true}
            />
            <OppModal oppModalVisible={oppModalVisible} setOppModalVisible={setOppModalVisible}
            oppName={oppName} setOppName={setOppName}
            oppIntros={oppIntros} setOppIntros={setOppIntros}
            oppState={oppState} setOppState={setOppState}
            oppTags={oppTags} setOppTags={setOppTags}
            oppProviders={oppProviders} setOppProviders={setOppProviders}
            oppEditable={true}
            />
            <div className="me_part" id="me_part1">
                {meIndex}
                <div className="me_part_content">
                    <div className="me_content_section" id="me_top">
                        
                        <h1>{userName}</h1>
                        <div className="me_slider"
                        onDoubleClick={() => {
                            if(isUser){
                               
                                setTempUserTags(removeDuplicates(userTags));
                                
                                swap(["me_slider_buf1","me_slider_buf2"],["me_slide_input"],'tags')
                            }}}
                        >
                            <div className="me_slider_buf" id="me_slider_buf1">
                                <div className="me_slider_left">
                                {userTags.map((tag, index) => {
                                    if (index === 0 || index === 1 || index === 2)
                                    return(
                                        <p className="me_slide_content" id={"me_slide_content_"+index} key={index}>{tag}</p>
                                    )
                                })}
                                {userTags.map((tag, index) => {
                                    if (index === 0 || index === 1 || index === 2)
                                    return(
                                        <p className="me_slide_content" id={"me_slide_content_"+index} key={index}>{tag}</p>
                                    )
                                })}
                                {userTags.map((tag, index) => {
                                    if (index === 0 || index === 1 || index === 2)
                                    return(
                                        <p className="me_slide_content" id={"me_slide_content_"+index} key={index}>{tag}</p>
                                    )
                                })}
                                </div>
                            </div>
                            <div className="me_slider_buf" id="me_slider_buf2">
                                <div className="me_slider_right">
                                {userTags.map((tag, index) => {
                                    if (index === 3 || index === 4 || index === 5)
                                    return(
                                        <p className="me_slide_content" id={"me_slide_content_"+index} key={index}>{tag}</p>
                                    )
                                })}
                                {userTags.map((tag, index) => {
                                    if (index === 3 || index === 4 || index === 5)
                                    return(
                                        <p className="me_slide_content" id={"me_slide_content_"+index} key={index}>{tag}</p>
                                    )
                                })}
                                {userTags.map((tag, index) => {
                                    if (index === 3 || index === 4 || index === 5)
                                    return(
                                        <p className="me_slide_content" id={"me_slide_content_"+index} key={index}>{tag}</p>
                                    )
                                })}
                                </div>
                            </div>
                            <div class="me_input_tag_section hidden" id="me_slide_input">
                                <div class="me_input_tag_added_section">
                                {
                                    tempUserTags.map((tag, index) => {
                                        return(<p onClick={() => removeTag(index)} key={index}>{tag}</p>)
                                    })
                                }
                                    <p class="me_input_tag_adder" onClick={() => setTagAddSectionOn(!tagAddSectionOn)}
                                    >{tagAddSectionOn ? "+" : "-"}</p>
                                </div>
                                <p class="me_input_tag_instruction">** set maximum of 6 tags</p>
                                <div class={"me_input_tag_pot_section "+(tagAddSectionOn?"hidden":null)}>
                                {
                                    potentialUserTags.map((tag, index) => {
                                        return(<p onClick={() => addTag(index)} key={index}>{'+ '+tag}</p>)
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="me_sectioner"></div>
                    {
                        userIntro.map((item, index) => {
                            return(
                                <div className="me_content_section user_intro me_intro" id="me_intro"
                                onDoubleClick={() => {
                                    if(isUser){
                                        swap(["me_intro_title_"+index],
                                         ["me_intro_title_input_"+index],'intro',index)
                                    }
                                }}
                                key={index}>
                                    <div className="me_intro_delete">
                                        <p onClick={() => {
                                            if(isUser){
                                                deleteToState("intro",index)
                                            }
                                        }}>delete</p>
                                    </div>    
                                    
                                    {/* add markdown to html */}
                                    <div class="markdown-body">
                                        <p id={"me_intro_title_"+index}
                                        >{markdownToHtml(item)}</p>
                                    </div>

                                    <textarea className="me_intro_title_input hidden" 
                                    id={"me_intro_title_input_"+index}
                                    onChange={() => textAreaResize("me_intro_title_input_"+index)}
                                    defaultValue={item}></textarea>
                                    
                                    {/* <p className="me_intro_p" id={"me_intro_p_"+index}
                                    >{item}</p>

                                    <textarea className="me_intro_p_input hidden" 
                                    id={"me_intro_p_input_"+index}
                                    onChange={() => textAreaResize("me_intro_p_input_"+index)}
                                    defaultValue={item.intro_content}></textarea> */}
                                </div>
                            )
                        })
                        
                    }  
                    <div className="me_intro_add" onClick={() => {if(isUser){
                        addToState('intro')

                    }}}>
                        <p>+</p>
                    </div>
                    <div className="me_sectioner"></div>
                    <div className="me_content_section" id="me_cv">
                        <h2>C V</h2>
                        <div className="me_cv_item">
                            <h3>Experiences</h3>
                            <div className="me_cv_page">
                                {
                                    userCv.map((content, index) => {
                                        return(
                                            <div className="me_cv_row" 
                                            onDoubleClick={() => {
                                                if(isUser){
                                                    swap(["me_cv_item_time_"+index, "me_cv_item_event_"+index, "me_cv_item_note_"+index],
                                                    ["me_cv_item_time_input_"+index, "me_cv_item_event_input_"+index, "me_cv_item_note_input_"+index],
                                                    'cv', index)
                                                }
                                            }}
                                                key={index}>
                                                <div className="me_cv_cell me_cv_item_time" id={"me_cv_item_time_"+index}>
                                                    <p>{content.user_cv_time}</p>
                                                    <div className="me_cv_delete"
                                                    onClick={() => {
                                                        if(isUser){
                                                            deleteToState('cv',index)
                                                        }
                                                    }}
                                                    >delete</div>
                                                </div>
                                                <textarea className="me_cv_item_time hidden" id={"me_cv_item_time_input_"+index}
                                                defaultValue={content.user_cv_time}></textarea>
                                                
                                                <div className="me_cv_cell me_cv_item_event" 
                                                id={"me_cv_item_event_"+index}
                                                >{content.user_cv_event}</div>
                                                <textarea className="me_cv_item_event hidden" 
                                                id={"me_cv_item_event_input_"+index}
                                                defaultValue={content.user_cv_event}></textarea>
                                                
                                                <div className="me_cv_cell me_cv_item_note" 
                                                id={"me_cv_item_note_"+index}
                                                >{content.user_cv_note}</div>
                                                <textarea className="me_cv_item_note hidden" 
                                                id={"me_cv_item_note_input_"+index}
                                                defaultValue={content.user_cv_note}></textarea>
                                            </div>
                                        )
                                    })
                                }
                                <div className="me_cv_row me_cv_add" onClick={() => {
                                        if(isUser){
                                            addToState('cv')
                                        }
                                    }} key={'add'}>
                                        <p>+</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="me_sectioner"></div>

                    <div className="me_content_section" id="me_music">
                        <div className="me_music_gallery">
                            <div className="me_music_col" id="me_music_col0">
                                <div className="me_music_cell" id="me_music_cell_0_0">
                                    <div className="me_music_title">
                                        <div className="me_music_cell_subrow">
                                            <p>m</p>
                                            <p>u</p>
                                            <p>s</p>
                                        </div>
                                        <div className="me_music_cell_subrow">
                                            <p>i</p>
                                            <p>c</p>
                                            <p>s</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    userMusic.map((music, index) => {
                                        if (index%2 === 1){
                                            return(
                                                <div className="me_music_cell" id={"me_music_cell_0_"+String(index+1)} key={index}>
                                                    <div className="me_music_item" id="me_music_item_style1">
                                                        <div className="me_music_content" id="me_music_content_default">
                                                            <h4>{music.music_name}</h4>
                                                            <h5>{music.album + ' | ' + String(music.year)}</h5>
                                                        </div>
                                                        <div className="me_music_content me_music_content_hover">
                                                            <p className="me_music_edit me_music_action"
                                                            onClick={()=>{handleMusicedit(index)}}>EDIT</p>
                                                            <div className="me_music_section_line">
                                                                <p>OR</p>
                                                            </div>
                                                            <p className="me_music_delete me_music_action"
                                                            onClick={() => {
                                                                if(isUser){
                                                                    deleteMusic(index,music.id)
                                                                    // deleteToState('music',index)
                                                                }
                                                            }}
                                                            >DELETE</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="me_music_col" id="me_music_col1">
                                <div className="me_music_add" onClick={() => {
                                    if(isUser){
                                        addToState('music')
                                    }
                                }}>
                                    <p>+</p>
                                </div>
                                {
                                    userMusic.map((music, index) => {
                                        if (index%2 === 0){
                                            return(
                                                <div className="me_music_cell" id={"me_music_cell_0_"+String(index+1)} key={index}>
                                                    <div className="me_music_item" id="me_music_item_style1">
                                                        <div className="me_music_content" id="me_music_content_default">
                                                            <h4>{music.music_name}</h4>
                                                            <h5>{music.album + ' | ' + String(music.year)}</h5>
                                                        </div>
                                                        <div className="me_music_content me_music_content_hover">
                                                            <p className="me_music_edit me_music_action" 
                                                            onClick={()=>{handleMusicedit(index)}}>EDIT</p>
                                                            <div className="me_music_section_line">
                                                                <p>OR</p>
                                                            </div>
                                                            <p className="me_music_delete me_music_action"
                                                            onClick={() => {
                                                                if(isUser){
                                                                    deleteMusic(index,music.id)
                                                                }
                                                            }}
                                                            >DELETE</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="me_sectioner"></div>

                    <div className="me_content_section user_opp">
                        <div className="user_opp_border">
                            <h2>Collab Opportunities</h2>
                        </div>
                        <div className="user_opp_galary">
                            <div className="user_opp_col">
                            {userOpp.map((opp, index) => {
                                if (index%3 === 0) {
                                    if (opp === null){
                                        return(
                                            <div className="user_opp_cell user_opp_cell_col0 user_opp_new"
                                            onClick={() => {
                                                if(isUser){
                                                    addToState('opp')
                                                }
                                            }} key={index}>
                                                <div className="user_opp_add">
                                                    <p className="user_opp_add_icon">+</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return(
                                        <div className={"user_opp_cell user_opp_cell_col0 me_opp_cell me_opp_state_"+(opp.user_opp_state ? "open" : "closed")}
                                        onDoubleClick={() => {
                                            if(isUser){
                                                handleOppEdit(index)
                                            }
                                        }}
                                            key={index}>
                                            <div className="me_opp_state" id={"me_opp_state_0"+index}>
                                                <p>{opp.user_opp_state ? "open" : "closed"}</p>
                                                <div className="me_opp_delete"
                                                onClick={() => {
                                                    if(isUser){
                                                        deleteOpp(index,opp.id)
                                                    }
                                                }}
                                                >delete</div>
                                            </div>
                                            <p className="user_opp_title" id={"user_opp_title_0"+index}
                                            >{opp.user_opp_title}</p>
                                            <textarea className="user_opp_title hidden" id={"user_opp_title_input_0"+index}
                                            defaultValue={opp.user_opp_title}></textarea>
                                            <p className="user_opp_info" id={"user_opp_info_0"+index}>{opp.user_opp_info}</p>
                                            <textarea className="user_opp_info hidden" id={"user_opp_info_input_0"+index}
                                            defaultValue={opp.user_opp_info}></textarea>
                                        </div>
                                    )
                                }
                            })}
                            </div>
                            <div className="user_opp_col">
                            {userOpp.map((opp, index) => {
                                if (index%3 === 1) {
                                    if (opp === null){
                                        return(
                                            <div className="user_opp_cell user_opp_cell_col0 user_opp_new"
                                            onClick={() => {
                                                if(isUser){
                                                    addToState('opp')
                                                }
                                            }}>
                                                <div className="user_opp_add">
                                                    <p className="user_opp_add_icon">+</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return(
                                        <div className={"user_opp_cell user_opp_cell_col1 me_opp_cell me_opp_state_"+(opp.user_opp_state ? "open" : "closed")}
                                        onDoubleClick={() => {
                                            if(isUser){
                                                handleOppEdit(index)
                                            }
                                        }}
                                        key={index}>
                                            <div className="me_opp_state" id={"me_opp_state_1"+index}>
                                                <p>{opp.user_opp_state ? "open" : "closed"}</p>
                                                <div className="me_opp_delete"
                                                onClick={() => {
                                                    if(isUser){
                                                        deleteOpp(index,opp.id)
                                                    }
                                                }}
                                                >delete</div>
                                            </div>
                                            <p className="user_opp_title" id={"user_opp_title_1"+index}
                                            >{opp.user_opp_title}</p>
                                            <textarea className="user_opp_title hidden" id={"user_opp_title_input_1"+index}
                                            defaultValue={opp.user_opp_title}></textarea>
                                            <p className="user_opp_info" id={"user_opp_info_1"+index}>{opp.user_opp_info}</p>
                                            <textarea className="user_opp_info hidden" id={"user_opp_info_input_1"+index}
                                            defaultValue={opp.user_opp_info}></textarea>
                                        </div>
                                    )
                                }
                            })}
                            </div>
                            <div className="user_opp_col">
                            {userOpp.map((opp, index) => {
                                if (index%3 === 2) {
                                    if (opp === null){
                                        return(
                                            <div className="user_opp_cell user_opp_cell_col2 user_opp_new"
                                            onClick={() => {
                                                if(isUser){
                                                    addToState('opp')
                                                }
                                            }} key={index}>
                                                <div className="user_opp_add">
                                                    <p className="user_opp_add_icon">+</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return(
                                        <div className={"user_opp_cell user_opp_cell_col2 me_opp_cell me_opp_state_"+(opp.user_opp_state ? "open" : "closed")}
                                        onDoubleClick={() => {
                                            if(isUser){
                                                handleOppEdit(index)
                                            }
                                        }}
                                            key={index}>
                                            <div className="me_opp_state" id={"me_opp_state_2"+index}>
                                                <p>{opp.user_opp_state ? "open" : "closed"}</p>
                                                <div className="me_opp_delete"
                                                onClick={() => {
                                                    if(isUser){
                                                        deleteOpp(index,opp.id)
                                                    }
                                                }}
                                                >delete</div>
                                            </div>
                                            <p className="user_opp_title" id={"user_opp_title_2"+index}
                                            >{opp.user_opp_title}</p>
                                            <textarea className="user_opp_title hidden" id={"user_opp_title_input_2"+index}
                                            defaultValue={opp.user_opp_title}></textarea>
                                            <p className="user_opp_info" id={"user_opp_info_2"+index}>{opp.user_opp_info}</p>
                                            <textarea className="user_opp_info hidden" id={"user_opp_info_input_2"+index}
                                            defaultValue={opp.user_opp_info}></textarea>
                                        </div>
                                    )
                                }
                            })}
                            </div>
                        </div>
                        <div className="user_opp_border"></div>
                    </div>

                    <div className="me_content_section user_contact">
                        <div className="user_contact_col">
                            <div className="user_contact_cell"
                            onDoubleClick={() => {
                                if(isUser){
                                    swap(["user_contact_email"],["user_contact_email_input"],'contact','email')
                                }
                            }}>
                                <h5>Email</h5>
                                <textarea className="hidden" id="user_contact_email_input">{userContact.user_contact_email}</textarea>
                                <div className="user_contact_info me_contact_info" id="user_contact_email">
                                    <p>{userContact.user_contact_email}</p>
                                </div>
                            </div>
                            <div className="user_contact_cell"
                            onDoubleClick={() => {
                                if(isUser){
                                    swap(["user_contact_phone"],["user_contact_phone_input"],'contact','phone')
                                }
                            }}>
                                <h5>Phone</h5>
                                <textarea className="hidden" id="user_contact_phone_input">{userContact.user_contact_phone}</textarea>
                                <div className="user_contact_info me_contact_info" id="user_contact_phone">
                                    <p>{userContact.user_contact_phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="user_contact_col">
                            <div className="user_contact_cell"
                            onDoubleClick={() => {
                                if(isUser){
                                    swap(["user_contact_address"],["user_contact_address_input"],'contact','address')
                                }
                            }}>
                                <h5>Address</h5>
                                <textarea className="hidden" id="user_contact_address_input">{userContact.user_contact_address}</textarea>
                                <div className="user_contact_info me_contact_info" id="user_contact_address">
                                    <p>{userContact.user_contact_address}</p>
                                </div>
                            </div>
                            <div className="user_contact_cell"
                            onDoubleClick={() => {
                                if(isUser){
                                    swap(["user_contact_links"],["user_contact_links_input"], 'contact', 'links')
                                }
                            }}>
                                <h5>Links</h5>
                                <textarea className="hidden" id="user_contact_links_input"
                                onKeyDown={() => textAreaResize("user_contact_links_input")}>{linksToText()}</textarea>
                                <div className="user_contact_info_link" id="user_contact_links">
                                    <div className="user_contact_links me_contact_info">
                                        <a href={userContact.user_contact_links.ig_link}
                                        className={"user_contact_link_"+((user_contact.user_contact_links.ig_link !== null)? "on":"off")}
                                        >Ig</a>
                                        <a href={userContact.user_contact_links.yt_link}
                                        className={"user_contact_link_"+((user_contact.user_contact_links.yt_link !== null)? "on":"off")}
                                        >Yt</a>
                                        <a href={userContact.user_contact_links.tw_link}
                                        className={"user_contact_link_"+((user_contact.user_contact_links.tw_link !== null)? "on":"off")}
                                        >Tw</a>
                                        <a href={userContact.user_contact_links.fb_link}
                                        className={"user_contact_link_"+((user_contact.user_contact_links.fb_link !== null)? "on":"off")}
                                        >Fb</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}
export default User;