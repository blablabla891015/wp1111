import '../css/hubPage.css';
import { useEffect, useState, React} from 'react';
import { useParams ,useNavigate} from 'react-router-dom'
import instance from './instance';
import { useUser } from './hooks/useUser';
const HubPage = () => {
    const {id} =useParams()
    const navigate = useNavigate();
    const {username,userId,login}=useUser()
    useEffect(()=>{
        if(!login)navigate('/')
    },[login])
    const user_hubs = [
        {
            hub_id:40,
            hub_name:"hub name 1",
            hub_members:["user1","user2","user3","user4"]
        }
    ];

    const user_invs = [
        {
            hub_id:23,
            hub_name:"hub name 2",
            hub_members:["user1"]
        }
    ];    

    const make4 = (ref_list) => {
        let source_list = [...ref_list];
        const nulls = (4- (source_list.length%4))%4;
        for (let i=0; i<nulls; i++) source_list.push(null);
        return source_list;
    }

    const [userHubs, setUserHubs] = useState(make4(user_hubs));
    const [userInvs, setUserInvs] = useState(make4(user_invs));
    const [hubCounter, setHubCounter] = useState(0);
    const [invCounter, setInvCounter] = useState(0);
    const [hubModal, setHubModal] = useState("closed"); // true for open; false for closed

    // groups list of members into a string for presentation
    const groupMembers = (member_list) => {
        if (member_list === null || member_list === undefined) return null;
        if (member_list.length === 0) return "member: none";
        
        let return_str = "member: "+member_list[0];
        for (let i=1 ; i < member_list.length; i++){
            return_str += (', '+member_list[i]);
        }
        return return_str;
    }

    const accept_invitation=async(hub_id)=>{
        const  {data:{message,contents}} = await instance.put(
            'acceptinvitation',{
                hub_id:hub_id,
                user_id:userId
            }
        )
        return 
    }
    const newHub = (index,hub_id,hub_name,hub_members) => {
        // new Hub
        accept_invitation(hub_id)
        console.log("hub memberis",[...hub_members,username])
        setUserHubs(make4([
            {
                hub_id:hub_id,
                hub_name:hub_name,
                hub_members:[...hub_members,username],
            },
            ...(userHubs)
        ]))
    }

    const deleteInv = (index) => {
        console.log('deleteInv');
        setUserInvs(make4([
            ...(userInvs.slice(0, index)),
            ...(userInvs.slice(index+1, userInvs.length)),
        ]))
    }

    const enterHub = (hub_id) => {
        // enter Hub
        navigate('/Hub/'+hub_id)
    }

    const deleteHub = (index) => {
        console.log('deleteHub');
        setUserHubs(make4([
            ...(userHubs.slice(0, index)),
            ...(userHubs.slice(index+1, userHubs.length)),
        ]))
    }

    /*** Create New Hub ****/
    const createNewHub = async(hub_name) => {
        const {data:{message,contents}}= await instance.post('/NewHub',{
            id:id,
            hub_name:hub_name
        })
        setUserHubs(make4([
            {
                hub_id:contents.new_id,
                hub_name:hub_name,
                hub_members:[username],
            },
            ...(userHubs)
        ]))

        
    }  
    /*** Create New Hub ****/

    const openNewHubModal = () => {
        document.getElementById("new_hub_name").value = '';
        const require = document.getElementById("hub_name_required");
        if (!require.classList.contains('transparent')) require.classList.add('transparent');
        setHubModal("open");
    }

    const closeNewHubModal = () => {
        console.log('close');
        setHubModal("closed");
    }

    const submitNewHubRequest = () => {
        const new_content = document.getElementById("new_hub_name").value;
        // console.log('submit',new_content);
        if (new_content === null || new_content === '') {
            document.getElementById("hub_name_required").classList.remove('transparent');
        } else {
            createNewHub(new_content);
            closeNewHubModal();
        }
    }

    const getHublist=async()=>{
        console.log(id)
        const {data:{message,contents}}=await instance.get('getInfoArtisit',
        {params:{
            id
        }})
        // let test=contents.user_hubs.map((hub)=>{
        //     return hub.hub_name
        // })
        // console.log(contents)
        setUserHubs(make4(
            contents.user_hubs.map((hub)=>{
                if(hub.accepted){
                    return {
                        hub_id:hub.hub.id,
                        hub_members:hub.hub.hub_members.map((user)=>{return user.user_name}),
                        hub_name:hub.hub.hub_name
                    }
                }else{
                    return null
                }
                
            })
        ))
        setUserInvs(make4(
            contents.user_hubs.map((hub)=>{
                console.log(hub)
                if(!hub.accepted){
                    return {
                        hub_id:hub.hub.id,
                        hub_members:hub.hub.hub_members.map((user)=>{return user.user_name}),
                        hub_name:hub.hub.hub_name
                    }
                }else{
                    return null
                }
                
            })
        ))


    }
    useEffect(()=>{
        getHublist()
    },[id])



    return(
        <div class="hubs">

            {/* New Hub Modal */}
            <div class={"new_hub_modal_bg "+hubModal}>
                <div class="new_hub_modal_square">
                    <div class="new_hub_modal_out_btn" onClick={() => closeNewHubModal()}>X</div>
                    <h2 class="new_hub_modal_title">New Hub</h2>
                    <p class="new_hub_modal_text_top">Hub Name</p>
                    <input id="new_hub_name"></input>
                    <p class="new_hub_modal_text_bottom transparent" id="hub_name_required">hub name is required</p>
                    <div class="new_hub_modal_submit" onClick={() => submitNewHubRequest()}>Create Hub</div>
                </div>
            </div>
            {/* New Hub Modal */}

            <div class="hubs_buffer"></div>
            <div class="hubs_section">
                {/* hubs container */}
                <div class="hubs_container">
                    {/* hubs title and next page buttons */}
                    <div class="hubs_top">
                        <h2 class="hubs_icon" onClick={() => setHubCounter(hubCounter+userHubs.length-4)}>{'<'}</h2>
                        <div class="hubs_btn" onClick={() => openNewHubModal()}>
                            <p>+</p>
                            <h2>Hubs</h2>
                        </div>
                        <h2 class="hubs_icon" onClick={() => setHubCounter(hubCounter+4)}>{'>'}</h2>
                    </div>
                    {/* hubs */}
                    <div class="hubs_item_container hubs_active">
                    {
                        userHubs.map((hub, index) => {
                            if (index >= (hubCounter%(userHubs.length)) && index < (hubCounter%(userHubs.length)+4)){
                                if (hub === null){
                                    return(<div class="hubs_hub_buffer"></div>)
                                } else {
                                    return(
                                        <div class="hubs_hub" key={index}>
                                            <div class="hubs_item_name">{hub.hub_name}</div>
                                            <div class="hubs_item_members">{groupMembers(hub.hub_members)}</div>
                                            <div class="hubs_item_btns">
                                                <div class="hubs_item_btn hubs_enter_item"
                                                onClick={() => enterHub(hub.hub_id)}>Enter</div>
                                                <div class="hubs_item_btn hubs_quit_item"
                                                onClick={() => deleteHub(index)}>Quit</div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })
                    }
                    </div>

                </div>

                {/*invitation container*/}
                <div class="hubs_container">
                    <div class="hubs_top">
                        {/* invitation title and next page buttons */} 
                        <h2 class="hubs_icon" onClick={() => setInvCounter(invCounter+userInvs.length-4)}
                        >{'<'}</h2>
                        <h2>Invitations</h2>
                        <h2 class="hubs_icon" onClick={() => setInvCounter(invCounter+4)}
                        >{'>'}</h2>
                    </div>

                    <div class="hubs_item_container hubs_active">
                    { 
                        userInvs.map((hub, index) => {
                            if (index >= (invCounter%(userInvs.length)) && index < (invCounter%(userInvs.length)+4)){;
                                if (hub === null){
                                    return(<div class="hubs_hub_buffer"></div>)
                                } else {
                                    return(
                                        <div class="hubs_hub" key={index}>
                                            <div class="hubs_item_name">{hub.hub_name}</div>
                                            <div class="hubs_item_members">{groupMembers(hub.hub_members)}</div>
                                            <div class="hubs_item_btns">
                                                <div class="hubs_item_btn hubs_join_item"
                                                onClick={() => {newHub(index,hub.hub_id,hub.hub_name,hub.hub_members);
                                                 deleteInv(index);}}>Join</div>
                                                <div class="hubs_item_btn hubs_delete_item"
                                                onClick={() => deleteInv(index)}>Delete</div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );

}
export default HubPage;