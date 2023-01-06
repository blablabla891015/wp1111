import '../css/hub.css';
import '../css/markdown.css'
import { useRef, React, useEffect ,useState} from 'react';
import { useUser } from '../container/hooks/useUser';
import { useParams } from 'react-router-dom'
import instance from './instance';
import markdownToHtml from '../util/markdown'

// const Hub = (id) => {
const Hub = () => {
    const {id} =useParams()

    // const {username} = useUser();
    // const username = 'Coldplay';
    const {userId,username}=useUser()
    const [idCounter, setIdCounter] = useState(100);
    const [isUser,setIsUser]=useState()

    /***** REQUIRED DATA *****/
    // hub_name:        name/title of the hub page
    // hub_members:     members who were invited and agreed to join; has access to posting and commenting
    // hub_posts:       post information

    // post_user:       the hub member that post; represented as the index of array hub_members
    //                  EX: 0-Coldplay, 1-BTS, ...
    // post_time:       integer containing information of post year, month, date, hour
    //                  EX: posted on 12/31/2022 9pm > 2022123121
    // post_content:    string of posted content

    // comment_user:    the hub member that commented; represented as the index of array hub_members
    // comment_content: string of commented content


    const hub_name = "Our Universe";
    const hub_members = ['Coldplay','BTS','Guy Berryman','Johny Buckland', 'Will Champion',
    'Chris Martin', 'RM', 'Jin', 'Suga', 'JHope', 'V', 'Jimin', 'Jung Kook'];
    const hub_posts = [

        {   // post 0
            post_id: 29,
            post_user: 3,                                   
            post_time: 2022121309,
            post_content: "Guys! We're releasing the official mv for My Universe tomorrow!",
            comments: [
                {   // coment 0 of post 0
                    comment_id: 23,
                    comment_user: 4,
                    comment_content: "The poster looks like an avengers poster lol",
                }
            ]
        },
        {   // post 1
            post_id: 66,
            post_user: 2,
            post_time: 2022123100,
            post_content: "Once upon a time, many years from now... music is forbidden across\
            the spheres. On three different planets, three different bands defy the ban. Dj\
            Lafrique, on her alien radio ship, unites them via holoband. All the while they are\
            hunted by the silencers.",
            comments: [
                {   // comment 0 of post 1
                    comment_id: 41,
                    comment_user: 0,
                    comment_content: "You, you are my universe."
                },
                {   // comment 1 of post 1
                    comment_id: 62,
                    comment_user: 0,
                    comment_content: "And I just want to put you first."
                },
                {   // comment 2 of post 1
                    comment_id: 9,
                    comment_user: 0,
                    comment_content: "And you, you make my world light up inside."
                },
            ]
        }
    ];
    /***** REQUIRED DATA END *****/

    const [showRange, setShowRange] = useState([0,1,2,3,4]);

    /***** COMMUNICATING FUNCTIONS *****/
    const [hubName, setHubName] = useState(hub_name);
    const [hubMembers, setHubMembers] = useState(hub_members);
    const [hubPosts, setHubPosts] = useState(hub_posts);

    const [hubMemberDict, setHubMemberDict] = useState({});
    const [MemberImgUrlDict, setMemberImgUrlDict] = useState({});
    // const [hubMembers, setHubMembers] = useState(null);
    // const [hubPosts, setHubPosts] = useState(null);

    const fetchData = async () => {
         const {
             data: {message, contents},
         } = await instance.get('/getHubData', {params:{
             id
         }})
         if (message === 'success') {
            // console.log(contents)
            setHubName(contents.hub_name);
            let new_hubMembers_dict = {}
            let member_img_url_dict = {}
            // setHubMembers(contents.hub_members.map((member)=>{
            //     return member.user_name
            // }));
            contents.hub_members.map((member)=>{
                new_hubMembers_dict[member.id]=member.user_name
                member_img_url_dict[member.id] = member.img_url ? member.img_url : null
            })
            // console.log(new_hubMembers)
            setHubMembers(contents.hub_members.map((member)=>{
                return member.user_name
            }))
            setHubMemberDict(new_hubMembers_dict)
            setMemberImgUrlDict(member_img_url_dict)
            setHubPosts(contents.hub_posts);

         } else {
             console.log('message: ',message);
         }
    };
    const updateData=async()=>{
        const {
            data: {message, contents},
        } = await instance.put('/updataHubData', {
            id:id,
            hub_posts:hubPosts,
            hub_name:hubName
        })
    }
    useEffect(()=>{
        fetchData()
    },[id])
    useEffect(()=>{
        if(hubMemberDict[userId]!==undefined){
            // console.log('check')
            setIsUser(true)
        }
    },[hubMemberDict])
    useEffect(()=>{
        if(isUser){
            console.log(hubPosts)
            updateData()
        }
    },[hubPosts,hubName])

    const submitInvitation = async() => {
    // const submitInvitation = async () => {
        const user_code = document.getElementById("hub_modal_input").value;
        const {data:{message,contents}}= await instance.put('HubInvite',{
            user_name:user_code,
            hub_id:id
        })
        if(message==="error"){
            alert(contents)

        }
    }
        

    const changeShowRange = () => {
        setShowRange([
            showRange[1],
            showRange[2],
            showRange[3],
            showRange[4],
            ((showRange[4]+1)%hubMembers.length)
        ]);
    }

    const openModal = () => {
        document.getElementById("hub_modal_input").value = "";
        document.getElementById("hub_modal_container").classList.remove("hidden");
    }

    const closeModal = () => {
        document.getElementById("hub_modal_container").classList.add("hidden");
    }

    const findCommentUserId = () => {
        let i=0;
        for (; i<hubMembers.length; i++){
            if (hubMembers[i] === username) break;
        }
        return i;
    }

    // const userId = findCommentUserId();

    const addComment = (id) => { 
        console.log(id)
    // const addComment = async (id) => { 
        const comment_content = document.getElementById("hub_new_comment_"+id).value;
        console.log("comment_content: ", comment_content)
        document.getElementById("hub_new_comment_"+id).value = '';
        const post_item = hubPosts[id];
        console.log("userId: ", userId)
        setHubPosts([
           ...(hubPosts.slice(0,id)),
           {
            post_id: post_item.post_id,
            post_user: post_item.post_user,
            post_time: post_item.post_time,
            post_content: post_item.post_content,
            comments: [
                ...(post_item.comments),
                {   
                    comment_id: idCounter,
                    comment_user: userId,
                    comment_content: comment_content,
                }
            ]
           },
           ...(hubPosts.slice(id+1,hubPosts.length))
        ]);
        // await newHubComment(post_item.post_id, userId, comment_content);
        setIdCounter(idCounter + 1);
    };

    const addPost = (id) => { 
    // const addPost = async (id) => { 
        const post_content = document.getElementById("hub_new_post_content_"+id).value;
        const current_time = getCurrentTime();
        setHubPosts([
            ...(hubPosts.slice(0,id+1)),
            {   
                post_id: idCounter,
                post_user: userId,
                post_time: current_time,
                post_content: post_content,
                comments: [],
            },
            ...(hubPosts.slice(id+1,hubPosts.length)),
        ])
        
        // await newHubPost(idCounter,userId,post_content);
        setIdCounter(idCounter+1);
    };

    const commentToggleEdit = (index, toEdit) => { 
        
        const show_id_list = (toEdit) ? ["hub_comment_context_input_","hub_comment_save_"] : ["hub_comment_context_","hub_comment_edit_"];
        const hide_id_list = (toEdit) ? ["hub_comment_context_","hub_comment_edit_"] : ["hub_comment_context_input_","hub_comment_save_"];
        
        for (let i=0; i<show_id_list.length; i++) {
            let target = document.getElementById(show_id_list[i]+index);
            if(target !== null) target.classList.remove('hidden');
            else console.log(show_id_list[i]+index)
        }
        for (let j=0; j<hide_id_list.length; j++) {
            let target = document.getElementById(hide_id_list[j]+index);
            if(target !== null) target.classList.add('hidden');
            else console.log(hide_id_list[j]+index);
        }
    };

    const postToggleEdit = (index, toEdit) => { 
        if (toEdit) document.getElementById("hub_post_content_input_"+index).value = hubPosts[index].post_content;
        const show_id_list = (toEdit) ? ["hub_post_content_input_","hub_post_save_"] : ["hub_post_content_","hub_post_edit_"];
        const hide_id_list = (toEdit) ? ["hub_post_content_","hub_post_edit_"] : ["hub_post_content_input_","hub_post_save_"];
        
        for (let i=0; i<show_id_list.length; i++) {
            let target = document.getElementById(show_id_list[i]+index);
            target.classList.remove('hidden');
        }
        for (let j=0; j<hide_id_list.length; j++) {
            let target = document.getElementById(hide_id_list[j]+index);
            target.classList.add('hidden');
        }
    };

    const editComment = (post_id, comment_id) => { 
    // const editComment = async (post_id, comment_id) => { 
        const comment_content = document.getElementById("hub_comment_context_input_"+post_id+comment_id).value;
        const post_item = hubPosts[post_id];
        console.log('new_comment:',comment_content);
        setHubPosts([
            ...(hubPosts.slice(0,post_id)),
            {   
                post_id: post_item.post_id,
                post_user: post_item.post_user,
                post_time: post_item.post_time,
                post_content: post_item.post_content,
                comments: [
                    ...(post_item.comments.slice(0,comment_id)),
                    {   
                        comment_id: post_item.comments[comment_id].comment_id,
                        comment_user: userId,
                        comment_content: comment_content,
                    },
                    ...(post_item.comments.slice(comment_id+1,hubPosts[post_id].comments.length)),
                ]
            },
            ...(hubPosts.slice(post_id+1,hubPosts.length))
         ]);
        //  await editHubComment(post_item.post_id, post_item.comments[comment_id].comment_id, userId, comment_content);
    };

    const editPost = (post_id) => { 
    // const editPost = async (post_id) => { 
        const post_content = document.getElementById("hub_post_content_input_"+post_id).value;
        const post_item = hubPosts[post_id];
        setHubPosts([
            ...(hubPosts.slice(0,post_id)),
            {   
                post_id: post_item.post_id,
                post_user: post_item.post_user,
                post_time: post_item.post_time,
                post_content: post_content,
                comments: post_item.comments,
            },
            ...(hubPosts.slice(post_id+1,hubPosts.length))
        ])
        // await editHubPost(post_item.post_id, post_content);
    }

    const deleteComment = (post_id, comment_id) => { 
    // const deleteComment = async (post_id, comment_id) => { 
        const post_item = hubPosts[post_id];
        setHubPosts([
            ...(hubPosts.slice(0,post_id)),
            {   
                post_id: post_item.post_id,
                post_user: post_item.post_user,
                post_time: post_item.post_time,
                post_content: post_item.post_content,
                comments: [
                    ...(post_item.comments.slice(0,comment_id)),
                    ...(post_item.comments.slice(comment_id+1,hubPosts[post_id].comments.length)),
                ]
            },
            ...(hubPosts.slice(post_id+1,hubPosts.length))
         ]);
        // await deleteHubComment(post_item.post_id, post_item[post_id].comments[comment_id].comment_id);
    };

    const deletePost = (id) => {
    // const deletePost = async (id) => {
        setHubPosts([
            ...(hubPosts.slice(0,id)),
            ...(hubPosts.slice(id+1,hubPosts.length)),
        ]);

        // await deleteHubPost(hubPosts[post_id].post_id);
    };

    const toggleAddPostTool = (id, proceed) => {
        document.getElementById('hub_new_post_content_'+id).value="";
        const show_item = (proceed ? document.getElementById('hub_new_post_section_'+id) : document.getElementById('hub_post_add_container_'+id));
        const hide_item = (proceed ? document.getElementById('hub_post_add_container_'+id) : document.getElementById('hub_new_post_section_'+id));
        hide_item.classList.add('hidden');
        show_item.classList.remove('hidden');
    }

    const getCurrentTime = () => {
        let output = 0;
        const today = new Date();
        output += today.getFullYear() * 1000000;
        output += (today.getMonth()+1) * 10000;
        output += today.getDate() * 100;
        output += today.getHours();
        console.log('current time is ',output);
        return output;
    }

    const findTimeAgo = (timeInt) => {
        const post_year  = parseInt(timeInt/1000000);
        const post_month = parseInt(timeInt%1000000/10000);
        const post_date  = parseInt(timeInt%10000/100);
        const post_hour  = timeInt%100;

        const now = new Date();
        const now_year = now.getFullYear();
        const now_month = now.getMonth()+1;
        const now_date = now.getDate();
        const now_hour = now.getHours();

        let unit = null;
        let diff = null;
        if (now_year !== post_year) {
            unit = ' year';
            diff = now_year - post_year;

        } else if (now_month !== post_month) {
            unit = ' month';
            diff = now_month - post_month;

        } else if(now_date !== post_date) {
            unit = ' day';
            diff = now_date - post_date;
        
        } else {
            unit = ' hour';
            diff = now_hour - post_hour;
        }

        if (diff > 1)   return String(diff) + unit + 's ago';
        return String(diff) + unit + ' ago';
    };

    return(
        <div class="hub">

        {/* modal */}
        <div class="hub_modal_container hidden" id="hub_modal_container"
        onDoubleClick={() => closeModal()}>
            <div class="hub_modal">
                <p>Enter User Name</p>
                <input id="hub_modal_input"></input>
                <div class="hub_modal_btn" onClick={() => {submitInvitation(); closeModal();}}
                >Submit</div>
            </div>
        </div>

        <div class="hub_part_index">
            <p id="hub_items_title">{hubName}</p>
            <div class="hub_items_container">
                {
                    hubMembers.map((item, index) => {
                        if(showRange.includes(index))
                        return(
                            <div class="hub_item">
                                <div class="hub_item_linemark"></div>
                                <p id={"hub_item_"+String(index)}>{item}</p>
                            </div>
                        )
                    })
                }
                <div class="hub_add_member_container">
                    <div class="hub_roll_btn">
                        <p onClick={() => changeShowRange()}>V</p>
                    </div>
                    <div class="hub_add_member" onClick={() => openModal()}>
                        <p class="hub_add_sign">+</p>
                        <p>Invite</p>
                    </div>
                </div>
            </div>
        </div>
    
        <div id="hub_post_buffer"></div>
        {
            hubPosts.map((post_item, post_index) => {
                const img_url = MemberImgUrlDict[post_item.post_user]
                // const hub_poster_head_icon = (<div class="hub_poster_head_sticker"></div>)
                const hub_poster_head_icon = 
                img_url ? (<img src={img_url} width="50px" height="50px" alt="personal_icon" />)
                        : (<div class="hub_poster_head_sticker"></div>)
                const hub_commenter_icon = 
                        img_url ? (<img src={img_url} width="50px" height="50px" alt="commenter_icon" />)
                                : (<div class="hub_commenter_icon"></div>)
                return(
                    <>
                        <div class="hub_post_section" id={"hub_post_"+String(post_index)}>    
                            <div class="hub_poster_container">
                                {/* change sticker to img_url */}
                                {hub_poster_head_icon}
                                <div class="hub_poster_info">
                                    <p id="hub_poster_name">{hubMemberDict[post_item.post_user]}</p>
                                    <p id="hub_post_time">{findTimeAgo(post_item.post_time)}</p>
                                </div>
                            </div>

                            {/* post content*/}
                            {/* markdown transform of "post" here */}
                            <div class="hub_post_content_container markdown-body">
                                <p id={"hub_post_content_"+post_index}>{markdownToHtml(post_item.post_content)}</p>
                                <textarea class="" id={"hub_post_content_input_"+post_index}></textarea>
                            </div>

                            {/* post buttons */}
                            <div class={"hub_post_action_container hub_post_action "+
                            ((post_item.post_user === userId)?null:"hub_post_action_disabled")}>
                                <p id={"hub_post_edit_"+post_index} 
                                onClick={() => postToggleEdit(post_index,true)}
                                >Edit</p>

                                <p id={"hub_post_save_"+post_index} class="hidden"
                                onClick={() => { editPost(post_index);
                                postToggleEdit(post_index,false);}}
                                >Save</p>

                                <div class="hub_post_section_line"></div>
                                <p onClick={() => deletePost(post_index)}>Delete</p>
                            </div>
                            
                            {/* new comment */}
                            <div class="hub_post_new_comment_container">
                            <div class="hub_user_icon"></div>
                            <div class="hub_new_info_container">
                                    <input class="hub_new_info" 
                                    id={"hub_new_comment_"+post_index}
                                    placeholder="What are your thoughts?"/>
                                    <div class="hub_submit_btn"
                                    onClick={() => addComment(post_index)}>
                                        <p>comment</p>
                                    </div>
                                </div>
                            </div>
                            
                            {
                                post_item.comments.map((comment_item, comment_index) => {
                                    return(
                                        <div class="hub_comments_container">
                                            <div class="hub_comment_container">
                                                {/* change icon to img_url */}
                                                {hub_commenter_icon}
                                                <div class="hub_comment">
                                                    <div class="hub_comment_top">
                                                        <p id="hub_commenter">{hubMemberDict[comment_item.comment_user]}</p>
                                                        {(comment_item.comment_user === userId) ? (
                                                            <>
                                                                <p class="hub_action hub_delete"
                                                                onClick={() => deleteComment(post_index, comment_index)}
                                                                >delete</p>

                                                                <p class="hub_action hub_edit"
                                                                id={"hub_comment_edit_"+post_index+comment_index}
                                                                onClick={() => commentToggleEdit(String(post_index)+String(comment_index), true)}
                                                                >edit</p>

                                                                <p class="hub_action hub_save hidden"
                                                                id={"hub_comment_save_"+post_index+comment_index}
                                                                onClick={() => { editComment(post_index, comment_index);
                                                                commentToggleEdit(String(post_index)+String(comment_index), false);}}
                                                                >save</p>
                                                            </>
                                                        ) : null }
                                                    </div>
                                                    {/* markdown transform of "comment" here */}
                                                    <div className='markdown-body'>
                                                        <p id={"hub_comment_context_"+post_index+comment_index}> {markdownToHtml(comment_item.comment_content)} </p>
                                                    </div>
                                                    <textarea class="hidden" id={"hub_comment_context_input_"+post_index+comment_index}
                                                    >{comment_item.comment_content}</textarea>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        {/* potential new post*/}
                        <div class="hub_new_post_section hidden" id={"hub_new_post_section_"+post_index}>
                            <div class="hub_poster_container">
                                <div class="hub_poster_head_sticker"></div>
                                <div class="hub_poster_info">
                                    <p id="hub_poster_name">{username}</p>
                                    <p id="hub_post_time">now</p>
                                </div>
                            </div>
                            <div class="hub_post_content_container">
                                <textarea id={"hub_new_post_content_"+post_index} placeholder="what is to be shared?"></textarea>
                            </div>
                            <div class="hub_post_action_container">
                                <p onClick={() => {addPost(post_index); toggleAddPostTool(post_index, false);}}>Submit</p>
                                <div class="hub_post_section_line"></div>
                                <p onClick={() => toggleAddPostTool(post_index, false)}>Delete</p>
                            </div>
                        </div>

                        {/* add new post sign*/}
                        <div class="hub_post_add_container" id={"hub_post_add_container_"+post_index}>
                            <div class="hub_post_add">
                                <div class="hub_post_line"></div>
                                <p class="hub_post_add_icon"
                                onClick={() => toggleAddPostTool(post_index, true)}
                                >+</p>
                                <p class="hub_post_add_text"
                                onClick={() => toggleAddPostTool(post_index, true)}
                                >Add Post</p>
                            </div>
                        </div>
                    </>
                )
            })
        }    
    </div>
    )
}
export default Hub