import '../css/oppModal.css'
import { useRef, React, useEffect, useState} from 'react';

// const OppModal = (oppModalVisible, setOppModalVisible, userStatus, userApplied, setUserApplied, Appliers) => {
const OppModal = ({
    oppModalVisible,setOppModalVisible,
    oppName,setOppName,
    oppState,setOppState,
    oppIntros,setOppIntros,
    oppProviders,setOppProviders,
    oppTags,setOppTags,
    oppEditable

}) => {
    const opp_title = "Worship Musician Pianist";
    const opp_tags = [
        "Pianist","Worship Music","Music Ministry International", "Equipment-provided",
        "Face-to-face","One-off","Church",
    ];
    const opp_providers = [
        "Yuma, Az", "Music Ministry International",
    ];
    const opp_intros = [
        "1.1 Description of Services/Introduction: The musician shall provide all personnel\
        , equipment, supplies, facilities, transportation, tools, materials, supervision, and\
        other items and non-personal services necessary to perform Contract Musician services\
        as defined in this PWS except for those items specified as government furnished property\
        (GFP) and government furnished services (GFS). The musician shall perform to the standards\
        in this contract.!",

        "1.2 Background: The Government requires Musician services in support of military religious\
        and worship activities. The Musician shall provide support to the Religious Support Office\
        (RSO), Chaplains, and Religious Affairs Specialists for Department of the Army (DA). The\
        location(s) and time(s) specified in the PWS or modified in the contract by the Contracting\
        Officer.",

        "1.3 Objectives: Services provided shall be conducted in accordance with Army Regulation 165-1\
        Army Chaplain Corps Activities. The Contract Musician shall provide music to facilitate worship\
        services conducted under the scope of the Garrison Chapel program. The Musician shall lead singing\
        and play piano or guitar to accompany the congregational worship. The Musician shall also be prepared\
        to lead rehearsals if additional volunteer musicians wish to participate. Musical selections will be\
        made in consultation with the Garrison Chaplain and/or the clergy leading the worship service."
    ];
    const opp_state = true;

    // const [oppModalVisible, setOppModalVisible] = useState(true);
    // const [userStatus, setUserStatus] = useState("me");
    // const [userStatus, setUserStatus] = useState("they");
    const userStatus='me'
    const [userApplied, setUserApplied] = useState(true);
    // const [oppAppliers, setOppAppliers] = useState(opp_appliers);


    const [editing,setEditing] = useState(false);
    const [prevSwap, setPrevSwap] = useState(null);

    // const [oppName, setOppName] = useState(opp_title);
    // const [oppTags, setOppTags] = useState(opp_tags);
    // const [oppProviders, setOppProviders] = useState(opp_providers);
    // const [oppIntros, setOppIntros] = useState(opp_intros);
    // const [oppState, setOppState] = useState(opp_state);

    const toggleState = () => {
        if(oppEditable){
            setOppState(!oppState);

        }
        // setOppState(!oppState);
    }

    // input list of creator, output text separated by ', '
    const providersToText = (provider_list) => {
        if(oppEditable){
            if (provider_list === null || provider_list.length === 0) return null;
            let output_text = provider_list[0];
            for (let i=1; i<provider_list.length; i++)  output_text += (', '+provider_list[i]);
            return output_text;

        }
        // if (provider_list === null || provider_list.length === 0) return null;
        // let output_text = provider_list[0];
        // for (let i=1; i<provider_list.length; i++)  output_text += (', '+provider_list[i]);
        // return output_text;
    }

    // input list of tags, output text separated by ' | '
    // const tagsToText = (tag_list) => {
    //     if (tag_list === null || tag_list.length === 0) return null;
    //     let output_text = tag_list[0];
    //     for (let i=1; i<tag_list.length; i++) output_text += (' | '+tag_list[i]);
    //     return output_text; 
    // }

    const newIntro = (id) => {
        if(oppEditable){
            setOppIntros([
                ...(oppIntros.slice(0,id+1)),
                "This is a new pargraph. Double click to edit.",
                ...(oppIntros.slice(id+1,oppIntros.length)),
            ])

        }
        // setOppIntros([
        //     ...(oppIntros.slice(0,id+1)),
        //     "This is a new pargraph. Double click to edit.",
        //     ...(oppIntros.slice(id+1,oppIntros.length)),
        // ])
    }
    const deleteIntro = (id) => {
        if(oppEditable){
            setOppIntros([
                ...(oppIntros.slice(0,id)),
                ...(oppIntros.slice(id+1,oppIntros.length)),
            ])

        }
        // setOppIntros([
        //     ...(oppIntros.slice(0,id)),
        //     ...(oppIntros.slice(id+1,oppIntros.length)),
        // ])
    }

    const editToState = (input_id, type, id=null) => {
        if(oppEditable){
            const new_content = document.getElementById(input_id).value;

        if (type === 'name') {
            setOppName(new_content);

        } else if (type === 'tags') {
            const new_tags = new_content.split(' | ');
            setOppTags(new_tags);

        } else if (type === 'providers') {
            const new_providers = new_content.split(', ');
            setOppProviders(new_providers);

        } else if (type === 'intro') {
            setOppIntros(new_content)
        }

        }

        // const new_content = document.getElementById(input_id).value;

        // if (type === 'name') {
        //     setOppName(new_content);

        // } else if (type === 'tags') {
        //     const new_tags = new_content.split(' | ');
        //     setOppTags(new_tags);

        // } else if (type === 'providers') {
        //     const new_providers = new_content.split(', ');
        //     setOppProviders(new_providers);

        // } else if (type === 'intro') {
        //     setOppIntros([
        //         ...(oppIntros.slice(0,id)),
        //         new_content,
        //         ...(oppIntros.slice(id+1,oppIntros.length)),
        //     ])
        // }
    }

    // /**** TODO ****/
    // const toUser = (index) => {
    //     console.log('navigate to user ',oppAppliers[index].user_id);
    // }
    // /**** TODO ****/

    // hide item of hide_id, show item of show_id
    const hideShow = (hide_id, show_id) => {
        if(oppEditable){
            document.getElementById(hide_id).classList.add('hidden');
        document.getElementById(show_id).classList.remove('hidden');

        }
        // document.getElementById(hide_id).classList.add('hidden');
        // document.getElementById(show_id).classList.remove('hidden');
    }

    // 'id' stands for array index or subtype
    const swap = (display_id, type, id=null) =>{
        if(oppEditable){
            setEditing(true);
            let hide_id = display_id; 
            let show_id = display_id+'_input';

            // from display to input, prev clear
            if (prevSwap === null) {
                setPrevSwap({hide_id, show_id});

            // from input to display
            } else if (prevSwap.hide_id === display_id && prevSwap.show_id === (display_id+'_input')) {
                hide_id = display_id+'_input';
                show_id = display_id;
                setPrevSwap(null);
                editToState(display_id+'_input', type, id);

            // from display to input, prev not yet dealt with
            } else {
                hideShow(prevSwap.show_id,prevSwap.hide_id);
                setPrevSwap({hide_id, show_id});
            }

            hideShow(hide_id, show_id);

        }
        
    };
    
    /*** Tag Adding and Deleting Feature***/
    const tags=['Full Time', 'Part Time', 'Freelance', 'Intern','No Experience Required', 'No Degree Required', 
    'Work Online', 'Work From Home', 'Verified','Music Producer','Recording Engineer', 'Session Musician',
    'Artist Manager', 'Tour Manager', 'Music Teacher', 'Booking Agent', 'Music Publicist', 'Composer', 'Music Arranger',
    'Accompanist', 'Background Singer', 'Band Director', 'Choir Director', 'Conductor', 'Cover Band', 'DJ', 'Drummer'];

    const [potentialTags, setPotentialTags] = useState(tags);
    const [addTagMode, setAddTagMode] = useState(false);

    const addTag = (index) => {
        if(oppEditable){
            const tag_added = potentialTags[index];
        setPotentialTags([
            ...(potentialTags.slice(0,index)),
            ...(potentialTags.slice(index+1,potentialTags.length))
        ])   
        setOppTags([
            ...(oppTags), tag_added
        ])

        }
    }

    const removeTag = (index) => {
        if(oppEditable){
            const tag_removed = oppTags[index];
        setPotentialTags([
            ...(potentialTags), tag_removed
        ])
        setOppTags([
            ...(oppTags.slice(0,index)),
            ...(oppTags.slice(index+1,oppTags.length))
        ])

        }
    }
    /*** Tag Adding and Deleting Feature***/

    return (
        oppModalVisible ? (
        <div class={"opp_modal "+(oppEditable?"me":"they")}>
            <div class="opp_modal_bg">
                <div class="opp_modal_square">
                    <p class="opp_modal_out" onClick={() => setOppModalVisible(false)}>X</p>
                    
                    <div class="opp_modal_btn_row">
                        <div class={"opp_modal_btn opp_modal_state "+((oppState) ? "opp_state_open" : "opp_state_closed")}
                        onClick={() => toggleState()}>
                        {oppState ? "open" : "closed"}</div>
                        <div class={"opp_modal_btn opp_modal_apply "+((oppState) ? "opp_apply_open" : "opp_apply_closed")}>
                        {userApplied ? "un-apply" : "apply"}</div>
                    </div>

                    <div class="opp_modal_name" id="opp_modal_name">{oppName}</div>

                    <div class="opp_modal_tags_container" id="opp_modal_tags">
                        {
                            oppTags.map((tag, index) => {
                                return(
                                    <div class="opp_modal_tag" onClick={() => removeTag(index)}>{tag}</div>
                                )
                        })}
                        <div class="opp_modal_tag opp_modal_add_tag"
                        onClick={() => setAddTagMode(!addTagMode)}>{addTagMode ? "-" : "+"}</div>
                    </div>

                    <div class={"opp_potential_tags "+(addTagMode ? "add_tag" : "default")}>
                        {
                            potentialTags.map((tag, index) => {
                                return (<p onClick={() => addTag(index)}>{'+ '+tag}</p>)
                            })
                        }
                    </div>

                    <div class="opp_modal_info_line opp_modal_providers" id="opp_modal_providers"
                    onDoubleClick={console.log('check')}>{providersToText(oppProviders)}</div>
                    {/* <textarea class="opp_modal_info_line opp_modal_providers hidden" id="opp_modal_providers_input"
                    onDoubleClick={() => swap("opp_modal_providers","providers")}>{providersToText(oppProviders)}</textarea> */}

                    <div class="opp_modal_section_line"></div>
                    {/* <h2 class="opp_appliers_title">Appliers :</h2> */}
                    {/* <div class="opp_appliers_container">
                    
                    {
                        oppAppliers.map((applier, index) => {
                            if (index === 0) return(<p onClick={()=>toUser(index)}>{applier.user_name}</p>)
                            return(<p onClick={()=>toUser(index)}>{applier.user_name + ', '}</p>)
                        } )
                    }
                    <div class="opp_modal_section_line"></div>
                    </div> */}
                    <div>
                        {/* {
                            oppIntros.map((intro, index) => {
                                return (
                                    <div>
                                        <div class="opp_modal_intro" id={"opp_modal_intro_"+index}
                                        onDoubleClick={() => swap("opp_modal_intro_"+index,"intro",index)}>{intro}</div>
                                        <textarea class="opp_modal_intro hidden" id={"opp_modal_intro_"+index+'_input'}
                                        onDoubleClick={() => swap("opp_modal_intro_"+index,"intro",index)}>{intro}</textarea>

                                        <div class="opp_modal_action">
                                            <p class="opp_modal_action_btn" onClick={() => newIntro(index)}>Add</p>
                                            <p>/</p>
                                            <p class="opp_modal_action_btn" onClick={() => deleteIntro(index)}>Remove</p>
                                        </div>
                                    </div>
                                )
                            })
                        } */}
                        <div>
                                        <div class="opp_modal_intro" id={"opp_modal_intro_"+0}
                                        onDoubleClick={() => swap("opp_modal_intro_"+0,"intro",0)}>{oppIntros}</div>
                                        <textarea class="opp_modal_intro hidden" id={"opp_modal_intro_"+0+'_input'}
                                        onDoubleClick={() => swap("opp_modal_intro_"+0,"intro",0)}>{oppIntros}</textarea>

                                        {/* <div class="opp_modal_action">
                                            <p class="opp_modal_action_btn" onClick={() => newIntro(0)}>Add</p>
                                            <p>/</p>
                                            <p class="opp_modal_action_btn" onClick={() => deleteIntro(0)}>Remove</p>
                                        </div> */}
                                    </div>
                    </div>
                </div>
            </div>
        </div>
        ) : null
    )
}
export default OppModal