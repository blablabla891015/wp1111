/****************************************************************************
  FileName      [ navigationBar.js ]
  PackageName   [ src ]
  Author        [ Ya Chin Hu ]
  Synopsis      [ Implement the navigation bar ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import '../css/navigationBar.css'
import {useNavigate } from 'react-router-dom';
import { useUser } from '../container/hooks/useUser';

const NavBar = ({ visible }) => {


    const {login, setLogin, username, currentPage, setCurrentPage,userId}=useUser();
    const navigate = useNavigate();
    // console.log(login)
    // navbar left if (login === true)
    const navbar_left_logedIn = (
        <div className="navbar_section" id="navbar_section_left">
            <div className="navbar_item" onClick={e => {navigate('/'); setLogin(false); setCurrentPage('Home')}}>
                <p>LOG OUT</p>
                <div class="navbar_circle"></div>
            </div>
            <p id="navbar_sectioner">|</p>
            <div className="navbar_item">
                <p>{"Hi "+username}</p>
            </div>
        </div>
    );

    // navbar left if (login === false)
    const navbar_left_guest = (
        <div className="navbar_section" id="navbar_section_left">
            <div className="navbar_item" onClick={e => {navigate('/LogIn'); setCurrentPage('LogIn');}}>
                <p>LOG IN</p>
                <div class="navbar_circle" id={('LogIn'===currentPage) ? 'navbar_circle_on':null}></div>
            </div>
            <p id="navbar_sectioner">|</p>
            <div className="navbar_item" onClick={e => {navigate('/SignUp'); setCurrentPage('SignUp');}}>
                <p>SIGN UP</p>
                <div class="navbar_circle" id={('SignUp'===currentPage) ? 'navbar_circle_on':null}></div>
            </div>
        </div>
    );
    
    // pages located @ the mid-section of the navbar; '' for sectioner
    const navbar_mid_pages_logedIn = ['About', '', 'Browse', '', 'HubPage', '', 'User'];
    const navbar_mid_pages_guest   = ['About', '', 'Browse'];
    // const navbar_mid_pages_logedIn = ['About', '', 'Browse', '', 'Contact', '', 'HubPage', '', 'User'];
    // const navbar_mid_pages_guest   = ['About', '', 'Browse', '', 'Contact'];
    const navbar_mid_pages = login ? navbar_mid_pages_logedIn : navbar_mid_pages_guest;
    
    return (
        visible ? 
        <div>
            <div className='navbar'>
                {
                    // navbar left
                    login ? navbar_left_logedIn : navbar_left_guest
                }
                
                <div className="navbar_section" id="navbar_section_mid">
                {
                    // navbar mid
                    navbar_mid_pages.map((name, idx) => {
                        if (name === '') return(<p id="navbar_sectioner">|</p>);
                        return(
                            (name==='User')?
                            <div className="navbar_item" onClick={e => {navigate('/'+name+'/'+userId); setCurrentPage(name)}}>
                                <p>{name.toUpperCase()}</p>
                                <div class="navbar_circle" id={(name===currentPage) ? 'navbar_circle_on':null}></div>
                            </div>:
                            (name==="HubPage")?
                            <div className="navbar_item" onClick={e => {navigate('/'+name+'/'+userId); setCurrentPage(name)}}>
                                <p>{name.toUpperCase()}</p>
                                <div class="navbar_circle" id={(name===currentPage) ? 'navbar_circle_on':null}></div>
                            </div>:
                            <div className="navbar_item" onClick={e => {navigate('/'+name); setCurrentPage(name)}}>
                                <p>{name.toUpperCase()}</p>
                                <div class="navbar_circle" id={(name===currentPage) ? 'navbar_circle_on':null}></div>
                            </div>
                        );
                    })
                }
                </div>
                
                <div className="navbar_section" id="navbar_section_right">
                    <div className="navbar_item" onClick={e => {navigate('/'); setCurrentPage('Home')}}>
                        <p>M U S T O P I A</p>
                        <div class="navbar_circle"></div>
                    </div> 
                </div>
            </div>
        </div>
        :
        <div> </div>
    )

}
export default NavBar