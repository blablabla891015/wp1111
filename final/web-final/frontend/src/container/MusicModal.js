import '../css/musicModal.css'
import { useRef, React, useEffect, useState} from 'react';

// const MusicModal = (musicModalVisible, setMusicModalVisible, userStatus) => {
const MusicModal = ({
    musicModalVisible, setMusicModalVisible,
    musicName,setMusicName,
    musicCreators,setMusicCreators,
    musicIntros,setMusicIntros,
    musicLink,setMusicLink,
    musicAlbum,setMusicAlbum,
    musicTags,setMusicTags,
    musicYear,setMusicYear,
    musicEditable

}) => {

    // const [musicModalVisible, setMusicModalVisible] = useState(true);
    // const [userStatus, setUserStatus] = useState("me");
    // const [userStatus, setUserStatus] = useState("they");
    const userStatus='me'
    const [editing,setEditing] = useState(false);
    const [prevSwap, setPrevSwap] = useState(null);

    // console.log(musicEditable)
    
    // input list of creator, output text separated by ', '
    const creatorsToText = (creator_list) => {
        if(musicEditable){
            if (creator_list === null || creator_list.length === 0) return null;
            let output_text = creator_list[0];
            for (let i=1; i<creator_list.length; i++)  output_text += (', '+creator_list[i]);
            return output_text;

        }
    }

    // input list of tags, output text separated by ' | '
    // const tagsToText = (tag_list) => {
    //     if (tag_list === null || tag_list.length === 0) return null;
    //     let output_text = tag_list[0];
    //     for (let i=1; i<tag_list.length; i++) output_text += (' | '+tag_list[i]);
    //     return output_text; 
    // }

    const newIntro = (id) => {
        if(musicEditable){
            setMusicIntros([
                ...(musicIntros.slice(0,id+1)),
                "This is a new pargraph. Double click to edit.",
                ...(musicIntros.slice(id+1,musicIntros.length)),
            ])

        }
    }
    const deleteIntro = (id) => {
        if(musicEditable){
            setMusicIntros([
                ...(musicIntros.slice(0,id)),
                ...(musicIntros.slice(id+1,musicIntros.length)),
            ])

        }
    }

    const editToState = (input_id, type, id=null) => {
        if(musicEditable){
            const new_content = document.getElementById(input_id).value;

        if (type === 'name') {
            setMusicName(new_content);

        } else if (type === 'tags') {
            const new_tags = new_content.split(' | ');
            setMusicTags(new_tags);

        } else if (type === 'album_year') {
            const new_album = new_content.split(' | ')[0];
            const new_year  = Number(new_content.split(' | ')[1]);
            setMusicAlbum(new_album);
            setMusicYear(new_year);

        } else if (type === 'creators') {
            const new_creators = new_content.split(', ');
            setMusicCreators(new_creators);

        } else if (type === 'link') {
            const new_link = new_content.split(' ')[1];
            setMusicLink(new_link);

        } else if (type === 'intro') {
            setMusicIntros([
                ...(musicIntros.slice(0,id)),
                new_content,
                ...(musicIntros.slice(id+1,musicIntros.length)),
            ])
        }

        }

    }

    // hide item of hide_id, show item of show_id
    const hideShow = (hide_id, show_id) => {
        if(musicEditable){
            document.getElementById(hide_id).classList.add('hidden');
            document.getElementById(show_id).classList.remove('hidden');

        }
    }

    // 'id' stands for array index or subtype
    const swap = (display_id, type, id=null) =>{
        if(musicEditable){
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
    const tags = ['Electronic','Rock','Hip Hop','Jazz','Cinematic','Holiday','Retro','Lounge',
    'Blues','Soul &RnB','Funk', 'Latin','Country','Acoustic','Indie','Rap','Classical','Heavy Metal']
    
    const [potentialTags, setPotentialTags] = useState(tags);
    const [addTagMode, setAddTagMode] = useState(false);

    const addTag = (index) => {
        if(musicEditable){
            const tag_added = potentialTags[index];
            setPotentialTags([
                ...(potentialTags.slice(0,index)),
                ...(potentialTags.slice(index+1,potentialTags.length))
            ])   
            setMusicTags([
                ...(musicTags), tag_added
            ])

        }
    }

    const removeTag = (index) => {
        if(musicEditable){
            const tag_removed = musicTags[index];
            setPotentialTags([
                ...(potentialTags), tag_removed
            ])
            setMusicTags([
                ...(musicTags.slice(0,index)),
                ...(musicTags.slice(index+1,musicTags.length))
            ])
    }
    }
    /*** Tag Adding and Deleting Feature***/

    return (
        musicModalVisible ? (
        <div class={"music_modal "+(musicEditable ? "me":"they")}>
            <div class="music_modal_bg">
                <div class="music_modal_square">
                    <p class="music_modal_out" onClick={() => {console.log('check');setMusicModalVisible(false)}}>X</p>

                    <div class="music_modal_name" id="music_modal_name"
                    onDoubleClick={() => swap("music_modal_name","name")}>{musicName}</div>
                    <textarea class="music_modal_name hidden" id="music_modal_name_input"
                    onDoubleClick={() => swap("music_modal_name","name")}>{musicName}</textarea>

                    <div class="music_modal_tags_container" id="music_modal_tags">
                        {
                            musicTags.map((tag, index) => {
                                return(
                                    <div class="music_modal_tag" onClick={() => removeTag(index)}>{tag}</div>
                                )
                        })}
                        <div class="music_modal_tag music_modal_add_tag"
                        onClick={() => setAddTagMode(!addTagMode)}>{addTagMode ? "-" : "+"}</div>
                    </div>

                    <div class={"opp_potential_tags "+(addTagMode ? "add_tag" : "default")}>
                        {
                            potentialTags.map((tag, index) => {
                                return (<p onClick={() => addTag(index)}>{'+ '+tag}</p>)
                            })
                        }
                    </div>

                    <div class="music_modal_info_line" id="music_modal_album_year"
                    onDoubleClick={() => swap("music_modal_album_year","album_year")}>{musicAlbum + ' | ' + musicYear}</div>
                    <textarea class="music_modal_info_line hidden" id="music_modal_album_year_input"
                    onDoubleClick={() => swap("music_modal_album_year","album_year")}>{musicAlbum + ' | ' + musicYear}</textarea>

                    <div class="music_modal_info_line music_modal_creators" id="music_modal_creators"
                    onDoubleClick={() => swap("music_modal_creators","creators")}>{creatorsToText(musicCreators)}</div>
                    <textarea class="music_modal_info_line music_modal_creators hidden" id="music_modal_creators_input"
                    onDoubleClick={() => swap("music_modal_creators","creators")}>{creatorsToText(musicCreators)}</textarea>
                    
                    <div class="music_modal_link" id="music_modal_link"
                    onDoubleClick={() => swap("music_modal_link","link")}>
                        <p class="music_modal_link_info music_modal_link_text">link:</p>
                        <a class="music_modal_link_info" href={musicLink}>{musicLink}</a>
                    </div>
                    <textarea class="music_modal_link_input hidden" id="music_modal_link_input"
                    onDoubleClick={() => swap("music_modal_link","link")}>{"link: "+musicLink}</textarea>

                    <div class="musical_modal_section_line"></div>
                    <div>
                        {
                            musicIntros.map((intro, index) => {
                                return (
                                    <div>
                                        <div class="music_modal_intro" id={"music_modal_intro_"+index}
                                        onDoubleClick={() => swap("music_modal_intro_"+index,"intro",index)}>{intro}</div>
                                        <textarea class="music_modal_intro hidden" id={"music_modal_intro_"+index+'_input'}
                                        onDoubleClick={() => swap("music_modal_intro_"+index,"intro",index)}>{intro}</textarea>

                                        <div class="music_modal_action">
                                            <p class="music_modal_action_btn" onClick={() => newIntro(index)}>Add</p>
                                            <p>/</p>
                                            <p class="music_modal_action_btn" onClick={() => deleteIntro(index)}>Remove</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        ) : null
    )
}
export default MusicModal